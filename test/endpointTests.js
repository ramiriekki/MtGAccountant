const expect = require("chai").expect
const request = require("request")

const app = require("../src/server.js")
// const con = require("../src/server.js")
const port = 3001

describe("MtG Accountant endpoints", () => {
    before("Start Server", (done) => {
        server = app.listen(port, () => {
            console.log(`Server listening on localhost:${port}`)
            done();
        })
    })

    describe("Home view", () => {
        const url = `http://localhost:${port}/home`;

        it("returns status code 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })

    after("Close Server and database connection", (done) => {
        server.close();
        done();
    })
})