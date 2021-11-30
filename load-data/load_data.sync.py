# %%
import os
import elasticsearch as es
from dotenv import load_dotenv

# %%
load_dotenv()

# %%
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")
client = es.Elasticsearch("http://10.11.12.69:9200", http_auth=(username, password))

# %%
client.ping()

# %%
client.indices.get_alias()

# %%
index_name = "constantin_amazondataproject_v2"

# %%
client.indices.create(index=index_name)

# %%
client.search(index=index_name, query={"match_all": {}})

# %%
import pandas as pd

# %%
import csv
import numpy as np

# %%
convert_to_bool = lambda x: True if x == "Y" else False
converters = {"vine": convert_to_bool, "verified_purchase": convert_to_bool}

# %%
dtypes = {
    "marketplace": "category",
    "customer_id": np.int64,
    "review_id": "object",
    "product_id": "object",
    "product_parent": np.int64,
    "product_title": "object",
    "star_rating": np.int8,
    "helpful_votes": np.int16,
    "total_votes": np.int16,
    "review_headline": "object",
    "review_body": "object",
}


# %%
def data_iterator(reader):
        # need to remove when using csv.DictReader
        for chunk in reader:
            for _, row in chunk.iterrows():
                doc = {
                    "marketplace": row["marketplace"],
                    "customer_id": row["customer_id"],
                    "review_id": row["review_id"],
                    "product_id": row["product_id"],
                    "product_parent": row["product_parent"],
                    "product_title": row["product_title"],
                    "product_category": row["product_category"],
                    "star_rating": row["star_rating"],
                    "helpful_votes": row["helpful_votes"],
                    "total_votes": row["total_votes"],
                    "vine": row["vine"],
                    "verified_purchase": row["verified_purchase"],
                    "review_headline": row["review_headline"],
                    "review_body": row["review_body"],
                    "review_date": row["review_date"],
                }
                yield doc


# %%
client.delete_by_query(index=index_name, body={"query": {"match_all": {}}})

# %%
client.search({"query": {"match_all": {}}}, index=index_name)

# %%
from elasticsearch.helpers import bulk
with open("../amazon_reviews_multilingual_DE_v1_00.tsv", mode="r") as f:
    # TODO: replace this with a version of csv.DictReader
    reader = pd.read_csv(
        f,
        delimiter="\t",
        quoting=csv.QUOTE_NONE,
        encoding="utf-8",
        chunksize=7000,
        parse_dates=["review_date"],
        converters=converters,
        dtype=dtypes,
    )
    res = bulk(client=client, index=index_name, actions=data_iterator(reader))
res

# %%
