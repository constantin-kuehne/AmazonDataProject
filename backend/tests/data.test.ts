import queryUniqueAsin from "../src/elastic/query-unique-asin"

describe("data tests", () => {
    test("query-unique-asin: only give product ids back", async () => {
        // TODO: is there a better way to do this?
        const ASIN = "B000002L7"
        return queryUniqueAsin(`${ASIN}`).then(data => {
            const fieldsArray = data.body.hits.hits.map(d => d.fields["product_id.keyword"][0])
            fieldsArray.map(d => expect(typeof d).toBe("string"))
            fieldsArray.map((d: string) => expect(d.startsWith(ASIN)))
        })
    })
})
