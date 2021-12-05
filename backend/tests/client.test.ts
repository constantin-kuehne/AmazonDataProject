import client from "../src/elastic/client"

test('check if client ping is true', () => {
    return client.ping().then(data => {
        expect(data).toBe(true)
    })
})
