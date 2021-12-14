import client from "../src/elastic/client";

describe("elasticsearch client", () => {
  test("check if client ping is true", async () => {
    return client.ping().then((data) => {
      expect(data.body).toBe(true);
    });
  });
});
