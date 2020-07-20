const request = require("supertest");
const uRouter = require("../users/users-router");

describe("users router", () => {
  it("should get the users", () => {
    return request(uRouter)
      .get("/")
      .then((res) => {
        expect(res.json).toBe(users);
      });
  });

  it("should perform a find() helper task", () => {
    return request(uRouter)
      .get("/")
      .then((res) => {
        expect(users.find()).toBe(function find() {
          return db("users").select("id", "username", "password");
        });
      });
  });
});
