/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import getOrders from "../pages/api/orders";

describe("/api/orders", () => {
  describe("GET", () => {
    test("should return array of orders", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      await getOrders(req, res);

      expect(Array.isArray(res._getJSONData())).toBe(true);
      expect(res._getStatusCode()).toBe(200);
    });
  });
});
