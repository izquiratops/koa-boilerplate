import passport from "koa-passport";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const should = chai.should();

import server from "../src/server/index.js";
import User from "../src/server/models/users.js";

let cookies = {};

describe("Auth methods", () => {
  before(async () => {
    try {
      await User.deleteOne({ username: "testingNewUser" });
      await User.deleteOne({ username: "testingNewUser2" });
    } catch (err) {}

    await new User({ username: "testingNewUser2", password: "1234" }).save();
  });

  after(async () => {
    try {
      await User.deleteOne({ username: "testingNewUser" });
      await User.deleteOne({ username: "testingNewUser2" });
    } catch (err) {}
  });

  it("GET /auth/register Ok", () => {
    return chai
      .request(server)
      .get("/auth/register")
      .then((res) => {
        res.status.should.eql(200);
        should.not.exist(res.headers["set-cookie"]);
        res.type.should.eql("text/html");
        res.text.should.contain("<h1>Register</h1>");
      });
  });

  it("POST /auth/register Ok", () => {
    return chai
      .request(server)
      .post("/auth/register")
      .send({
        username: "testingNewUser",
        password: "1234",
      })
      .set("Accept", "application/json")
      .then((res) => {
        res.status.should.eql(200);
        should.not.exist(res.headers["set-cookie"]);
      });
  });

  it("POST /auth/register Fail on duplicate usernames", () => {
    return chai
      .request(server)
      .post("/auth/register")
      .send({
        username: "testingNewUser",
        password: "1234",
      })
      .set("Accept", "application/json")
      .then((res) => {
        res.status.should.eql(500);
      })
      .catch((err) => console.error(err));
  });

  it("GET /auth/login Ok", () => {
    return chai
      .request(server)
      .get("/auth/login")
      .then((res) => {
        res.status.should.eql(200);
        res.type.should.eql("text/html");
        res.text.should.contain("<h1>Login</h1>");
        should.not.exist(res.headers["set-cookie"]);
      });
  });

  it("POST /auth/login Ok", () => {
    return chai
      .request(server)
      .post("/auth/login")
      .send({
        username: "testingNewUser",
        password: "1234",
      })
      .set("Accept", "application/json")
      .then((res) => {
        res.status.should.eql(200);
        should.exist(res.headers["set-cookie"]);

        // Save cookies for later auth requests
        cookies = res.headers["set-cookie"];
      });
  });

  it("POST /auth/login Fail on wrong password", () => {
    return chai
      .request(server)
      .post("/auth/login")
      .send({
        username: "testingNewUser",
        password: "wrongPassword",
      })
      .set("Accept", "application/json")
      .then((res) => {
        res.status.should.eql(400);
      });
  });

  it("DELETE /auth/remove Ok", () => {
    return chai
      .request(server)
      .delete("/auth/remove")
      .send({ username: "testingNewUser2" })
      .set("Accept", "application/json")
      .set(
        "Cookie",
        Object.values(cookies).map((el) => el + ";")
      )
      .then((res) => {
        res.status.should.eql(200);
      });
  });

  it("DELETE /auth/remove Fail if not authorized", () => {
    return chai
      .request(server)
      .delete("/auth/remove")
      .send({ username: "testingNewUser2" })
      .set("Accept", "application/json")
      .set("Cookie", "bababooey")
      .then((res) => {
        res.status.should.eql(401);
      });
  });

  it("DELETE /auth/remove Fail if not found", () => {
    return chai
      .request(server)
      .delete("/auth/remove")
      .send({ username: "testingNewUser2" })
      .set("Accept", "application/json")
      .set(
        "Cookie",
        Object.values(cookies).map((el) => el + ";")
      )
      .then((res) => {
        res.status.should.eql(404);
      });
  });
});

describe("Auth methods with stub", () => {
  beforeEach(() => {
    // ...
  });

  afterEach(() => {
    // ...
  });

  before(async () => {
    return await new User({
      username: "testingNewUser2",
      password: "1234",
    }).save();
  });
});
