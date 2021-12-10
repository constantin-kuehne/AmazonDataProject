import queryUniqueAsin from "../src/elastic/query-unique-asin"
import { getQueryUniqueAsinHits } from "../src/elastic/get-hits"

describe("data tests", () => {
    test("query-unique-asin: only give product ids back", async () => {
        // TODO: is there a better way to do this?
        const ASIN = "B000002L7"
        return queryUniqueAsin(`${ASIN}`).then(data => {
            const fieldsArray = getQueryUniqueAsinHits(data)
            fieldsArray.map(d => expect(typeof d).toBe("string"))
            fieldsArray.map((d: string) => expect(d.startsWith(ASIN)))
        })
    })
})
