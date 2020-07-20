const request = require("supertest");
const aRouter = require("../auth/auth-router");

describe("Auth Router", () => {
  describe("register", () => {
    it("should add users to the db", () => {
      return request(aRouter)
        .post("/register")
        .then((res) => {
          expect(res.json).toBe(addedUser);
        });
    });
    it("should retun code 201", () => {
      return request(aRouter)
        .post("/register")
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("login", () => {
    it("should find a user by username", () => {
      return request(aRouter)
        .post("/login")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a message", () => {
      return request(aRouter)
        .post("/login")
        .then((res) => {
          expect(res.json).toHaveReturned({
            message: `Thank You ${user.username} for logging in!`,
            jwt_token: token,
          });
        });
    });
  });
});
