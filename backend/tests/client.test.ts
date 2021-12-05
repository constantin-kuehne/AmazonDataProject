import client from "../src/elastic/client"

test('check if client ping is true', () => {
   expect(client.ping()).toBe(true) 
})
