var assert = require("assert");
var link = require("./config");
const request = require("request");

describe("Test Get User with Token", () => {
  it("should return status code 200 and user Data", (done) => {
    const options = {
      url: `${link.link}users/getUser/`,
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc4M2E3YTRmYmQ5NTUzYTdkODliM2UiLCJpYXQiOjE2NzM0NDY5MzZ9.YmDVfoKh92clSqTa_FUZg91UXGdb0Zi2a3l8yky3vkM",
      },
    };
    request.get(options, (error, response, body) => {
      assert.equal(200, response.statusCode);
      assert.deepEqual(
        {
          _id: "63783a7a4fbd9553a7d89b3e",
          name: "django test",
          email: "djangotest@gmail.com",
          password:
            "$2a$10$Z8TTz.Z/eTd5JghAjpt2sOS6GELGDrLCbKyWgn/eo/AL3tI4PrXZW",
          dateJoined: "2022-11-19T02:07:54.935Z",
          last_login: "2022-11-19T02:07:54.935Z",
          __v: 0,
        },
        JSON.parse(body)
      );
      done();
    });
  });

  it("should return status code 400 and Invalid Token", (done) => {
    const options = {
      url: `${link.link}users/getUser/`,
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc4M2E3YTRmYmQ5NTUzYTdkODliM2UiLCJpYXQiOjE2NzM0NDY5MzZ9.YmDVfoKh92clSqTa_FUZg91UXGdb0Zi2a3l8yky3vkM",
      },
    };
    request.get(options, (error, response, body) => {
      assert.equal(400, response.statusCode);
      assert.deepEqual("Invalid token", JSON.parse(body));
      done();
    });
  });
});

// ////////////////////////////////////////////////////////////////////////////
describe("Test User Sign In", () => {
  it("should return status code 200 and Authorization Token", (done) => {
    const options = {
      url: "http://localhost:5000/users/signin/",
      method: "POST",
      json: {
        email: "djangotest@gmail.com",
        password: "123456",
      },
    };
    request(options, (error, response, body) => {
      assert.equal(200, response.statusCode);
      assert.equal("string", typeof body);
      assert(body.length > 0);
      done();
    });
  });

  it("should return status code 400 and Email is not correct", (done) => {
    const options = {
      url: "http://localhost:5000/users/signin/",
      method: "POST",
      json: {
        email: "djangoest@gmail.com",
        password: "12356",
      },
    };
    request(options, (error, response, body) => {
      assert.equal(400, response.statusCode);
      assert.equal("User with this email does not exist", body);
      done();
    });
  });

  it("should return status code 400 and Password is not correct", (done) => {
    const options = {
      url: "http://localhost:5000/users/signin/",
      method: "POST",
      json: {
        email: "djangotest@gmail.com",
        password: "12356",
      },
    };
    request(options, (error, response, body) => {
      assert.equal(400, response.statusCode);
      assert.equal("Password is not correct", body);
      done();
    });
  });
});

/////////////////////////////////////////////////////////////////////
describe("Test User Sign Up", () => {
  it("should return status code 201 and user Data", (done) => {
    const options = {
      url: "http://localhost:5000/users/signup/",
      method: "POST",
      json: {
        name: "django test",
        email: "djangotest4@gmail.com",
        password: "123456",
      },
    };
    request.get(options, (error, response, body) => {
      assert.equal(201, response.statusCode);
      assert.deepEqual("string", typeof JSON.parse(body.user_id));
      done();
    });
  });
});
