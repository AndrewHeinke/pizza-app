/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import loginUser from "../pages/api/login";

describe("/api/login", () => {
  describe("POST", () => {
    test("should return user object after login success", async () => {
      const { req, res } = createMocks({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          password: "test",
          username: "test",
        },
      });
      await loginUser(req, res);

      expect(typeof res._getJSONData()).toBe("object");
      expect(res._getStatusCode()).toBe(200);
    });

    test("should fail if incorrect password or username", async () => {
      const { req, res } = createMocks({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          password: "asdfasdf",
          username: "asdfasdf",
        },
      });

      try {
        await loginUser(req, res);
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });
  });
});
