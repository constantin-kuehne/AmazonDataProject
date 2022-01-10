import client from "../src/elastic/client";
import "../src/loadenv";

describe("elasticsearch client", () => {
  test("check if client ping is true", async () => {
    return client.ping().then((data) => {
      expect(data.body).toBe(true);
    });
  });
});
