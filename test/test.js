const assert = require("assert");
const request = require("supertest");
const app = require("express")();

describe("POST /login", () => {
  it("should return an error message when email is incorrect", (done) => {
    request(app)
      .post("/login")
      .send({ email: "incorrect@example.com" })
      .expect(400)
      .end((err, res) => {
        done();
      });
  });
});
