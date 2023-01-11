var assert = require("assert");
var link = require("./config");
const request = require('request');


describe("Test User return with Id", () => {
  it("should return status code 200", (done) => {
    const options = {
      url: `${link.link}users/getUser/`,
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc4M2E3YTRmYmQ5NTUzYTdkODliM2UiLCJpYXQiOjE2NzM0NDY5MzZ9.YmDVfoKh92clSqTa_FUZg91UXGdb0Zi2a3l8yky3vkM",
      },
    };
    request.get(options, (error, response, body) => {
        console.log(response.body)
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

  // it('should return the expected data', (done) => {
  //     request.get('http://localhost:3000/your-endpoint', (error, response, body) => {
  //         assert.deepEqual({some: 'data'}, JSON.parse(body));
  //         done();
  //     });
  // });
});
