const expect = require("chai").expect
const request = require("request")

const app = require("../src/server.js")
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

    describe("my-collection view", () => {
        const url = `http://localhost:${port}/my-collection`;

        it("returns status code 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

        const url2 = `http://localhost:${port}/my-collection?page=2`;

        it("page 2 also returns status code 200", (done) => {
            request(url2, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })

    describe("sets view", () => {
        const url = `http://localhost:${port}/sets`;

        it("returns status code 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

        const url2 = `http://localhost:${port}/sets/dmu`;

        it("specified set view also returns status code 200", (done) => {
            request(url2, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })

    describe("Single card view", () => {
        const url = `http://localhost:${port}/my-collection/9fca4c4f-a77b-483e-9da4-574ba2e3d179`;

        it("returns status code 200", (done) => {
            request(url, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })

    after("Close Server and database connection", (done) => {
        server.close();
        console.log("Server closed")
        done();
    })
})