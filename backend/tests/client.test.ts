import { SearchTotalHits } from "@elastic/elasticsearch/api/types"
import client from "../src/elastic/client"
import queryAsin from "../src/elastic/query-asin"
import queryUniqueAsin from "../src/elastic/query-unique-asin"

describe('elasticsearch client', () => {
    test('check if client ping is true', async () => {
        return client.ping().then(data => {
                expect(data.body).toBe(true)
            })
        })

    test('check if query for ASIN works', async () => {
        return queryAsin("").then(data => {
                expect(data.hasOwnProperty("statusCode")).toBe(true)
                expect(data.statusCode).toBe(200)
            })
        })

    test('check if query of a product id that should exist actually returns something', async () => {
        return queryAsin("B000002L7Y").then(data => {
                expect(data.hasOwnProperty("body")).toBe(true)
                expect(data.body.hasOwnProperty("hits")).toBe(true)
                expect(data.body.hits.hasOwnProperty("total")).toBe(true)
                expect(data.body.hits.total.hasOwnProperty("value")).toBe(true)
                const total = data.body.hits.total as SearchTotalHits
                expect(total.value).toBeGreaterThan(0)
            })
        })

    test('check if query for unique ASIN works', async () => {
        return queryUniqueAsin("B000002L7*").then(data => {
                expect(data.hasOwnProperty("body")).toBe(true)
                expect(data.body.hasOwnProperty("hits")).toBe(true)
                expect(data.body.hits.hasOwnProperty("hits")).toBe(true)
                // TODO: make this better maybe check for unique product ids
                expect(data.body.hits.hits.length).toBeLessThan(20)
            })
        })
})
