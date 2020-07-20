const request = require("supertest");
const server = require("../api/server");

describe("server", () => {
  it("should set testing", () => {
    expect(process.env.DB_ENV).toBe("Testing");
  });
  describe("GET", () => {
    it("should return a 200 code", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ token });
    });
  });
});
