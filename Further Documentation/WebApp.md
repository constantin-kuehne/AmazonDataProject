# Technical Details about ADP Search

## Infos
* React
  * webapp written in Typescript, HTML, CSS & D3.js
* MUI
  * Styling, Theming & Components
* Express Server 
  * handling various queries through APIs on the Elastic Database
* Data Visualization with D3.js
  * implemented in a dashboard (MUI Component Box, Div, Card, etc.)
* Elastic
  * Elastic database & Kibana Dashboard
  
## Structure
* Backend
  * elastic queries
  * routes
  * .env - Elastic Credentials
* Frontend
  * components
    * graphs -> D3 Visualizations
    * Appbar
    * Footer
    * Searchbar
    * Searchoptions 
  * pages
    * about
    * dashboard
  * App File
  * Index File
* Further Documentation
* Official Readme

We used different ways to apply styles to our webapp:
* CSS -> seperate css files for every section (about, dashboard) mixed with MUI style props
* MUI MakeStyles -> used in tsx files to apply styles directly to a MUI component

## Backend
### Data & Data Handling
* Elastic 

### Server
* Express Server 

### APIs

#### ASIN queries (prefix: /asin)

**/:ASIN**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

all reviews for this asin as stored in elasticsearch


Example:
```JSON
[
  {
    "marketplace": "US",
    "customer_id": 24201459,
    "review_id": "R3GV0ELL1GPRXL",
    "product_id": "B000002L7J",
    "product_parent": 922233394,
    "product_title": "Meat Is Murder",
    "product_category": "Music",
    "star_rating": 5,
    "helpful_votes": 0,
    "total_votes": 0,
    "vine": false,
    "verified_purchase": true,
    "review_headline": "what can i say   meat is murder",
    "review_body": "morrissey and johnny marr together  great fun  would buy again from seller  the smiths are a great 1980's group and am glad i grew up in the time frame",
    "review_date": "2014-03-03T00:00:00"
  },
  ...
]
```


**/:ASIN/number-reviews**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

only the number of reviews for this asin


Example:
```JSON
131
```


**/:ASIN/number-reviews/:DATETYPE**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)
- DATETYPE - *required* - the time interval of how the data should be aggregated; must be one of: DAY, WEEK, MONTH, QUARTER, YEAR


Returns:

the interval time in datetime format (yyyy-MM-dd'T'HH:mm:ss.SSSZ) in unix format; the amount of reviews in this interval (docCount)


Example:
```json
[
  {
    "intervalTime": "1998-10-01T00:00:00.000Z",
    "intervalTimeUnix": 907200000000,
    "docCount": 2
  }, 
  ...
]
```


Used in:

- LineChart

**/:ASIN/star-rating**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

the number of reviews of this asin and the average star rating over these reviews


Example:
```JSON
{
  "docCount": 131,
  "starRating": 4.5038167938931295
}
```


**/:ASIN/total-votes**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

the number of reviews of this asin and the sum of total votes over these reviews


Example:
```JSON
{
  "docCount": 131,
  "totalVotes": 932
}
```


**/:ASIN/helpful-votes**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

the number of reviews of this asin and the sum of helpful votes over these reviews


Example:
```JSON
{
  "docCount": 131,
  "helpfulVotes": 554
}
```


**/:ASIN/info**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Returns:

the number of reviews of this asin, the sum of helpful votes over these reviews, the sum of total votes over these reviews and the average star rating over these votes


Example:
```JSON
{
  "docCount": 131,
  "helpfulVotes": 554,
  "totalVotes": 932,
  "starRating": 4.5038167938931295
}
```


Used in:

- ScatterPlot1
- ScatterPlot2


**/:ASIN/reviews-votes**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Query parameters:

- size - *optional* - number of reviews that should be returned - default: 10


Returns:

the total votes, helpful votes and review headline of the top *size* reviews of this asin based on helpful votes :: total votes ratio


Example:
```JSON
[
  {
    "total_votes": 60,
    "helpful_votes": 49,
    "review_headline": "Masterful But Not the Smiths Best"
  },
  ...
]
```


**/:ASIN/reviews**

Parameters:

- ASIN - *required* - the product id of the product you want to search for (called ASIN at amazon)


Query parameters:

- size - *optional* - number of reviews that should be returned - default: 10


Returns:

the whole elasticsearch document of the top *size* reviews of this asin based on helpful votes :: total votes ratio


Example:
```JSON
[
  {
    "marketplace": "US",
    "customer_id": 24211710,
    "review_id": "R4MXH5I2WOEVD",
    "product_id": "B000002L7J",
    "product_parent": 922233394,
    "product_title": "Meat Is Murder",
    "product_category": "Music",
    "star_rating": 4,
    "helpful_votes": 19,
    "total_votes": 25,
    "vine": false,
    "verified_purchase": false,
    "review_headline": "Why over-the-top?",
    "review_body": "I think this album is really really good. A lot of the songs say things which are in my humble opinion critically important to humanity.&lt;br /&gt;The song Meat Is Murder is powerful and frightening but also heartfelt, so I don't see why it is &amp;quot;over-the-top&amp;quot;. Whilst I do believe in freedom of choice, Morrissey's opinion is being put forward, I think, in the interests of reducing suffering.  Just because it is difficult to listen to doesn't make it over-the-top IMO. I don't normally make bold statements or submit reviews, but this was important to me.",
    "review_date": "2004-05-02T00:00:00"
  },
  ...
]
```


Used in:

- BarChart


**/:ASIN/votes-similar-products**

Parameters:

- ASIN - *required* - the product id of the product you want similar products for (called ASIN at amazon)


Query parameters:

- size - *optional* - number of reviews that should be returned - default: 50
- title - *required* - the title of the product
- category - *required* - the category of the product


Returns:

the *size* most similar products to your product based on product title and category; computed by elasticsearch (computation based on [TF-IDF](https://en.wikipedia.org/wiki/Tf–idf))


Example:
```JSON
[
  {
    "ASIN": "B007F5S1BS",
    "docCount": 3,
    "totalVotes": 14,
    "helpfulVotes": 1,
    "starRating": 3.6666666666666665,
    "productTitle": "Meat Is Murder"
  },
  {
    "ASIN": "B00002496X",
    "docCount": 3,
    "totalVotes": 5,
    "helpfulVotes": 0,
    "starRating": 4.666666666666667,
    "productTitle": "Meat Is Murder"
  },
  ...
]
```


Used in:
- ScatterPlot1
- ScatterPlot2


#### Completion queries (prefix: /completion)

**/asin**

Query parameters:

- s - *required* - the string to search for
- size - *optional* - the number of search results - default: 10


Returns:

product parent, title, category and id of *size* products which begin or have the asin specified via the s query parameter; it gives back the whole doc


Example:
```JSON
[
  {
    "product_parent": 922233394,
    "product_id": "B000002L7J",
    "product_title": "Meat Is Murder",
    "product_category": "Music"
  },
  {
    "product_parent": 201336691,
    "product_id": "B000002L7O",
    "product_title": "Skin Dive",
    "product_category": "Music"
  },
  ...
]
```


Used in:

- Search bar


**/title**

Query parameters:

- s - *required* - the string to search for
- size - *optional* - the number of search results - default: 10


Returns:
product parent, title, category and id of *size* products which have a similar product title (based on elasticsearch  match query)


Example:
```JSON
[
  {
    "product_parent": 774579753,
    "product_id": "B00JIU7RYK",
    "product_title": "Love Macbook Decals Macbook Pro Decal Stickers Macbook Air for Apple Macbook",
    "product_category": "PC"
  },
  {
    "product_parent": 468330441,
    "product_id": "B00FGR29F6",
    "product_title": "macbook decal Macbook sticker partial cover Macbook Pro decal Skin Macbook Air 13 Sticker Macbook decal",
    "product_category": "PC"
  },
  ...
]
```


Used in:
- search bar


### Frontend
- React, written in Typescript

### MUI
- Material UI Themes, Components, Icons & Animation

### Components
- Appbar
- Searchbar
- Pages (Dashboard, About)
- Animations

### D3 Implementation
- Transpiling tsx to jsx
- Implementing Charts into a div using a D3 Wrapper


### Libraries
- MUI( Styles, Themes, Icons, ...)
- D3 (Scope, Geo, Bar, ...)
- React (React-Dom, ...)
