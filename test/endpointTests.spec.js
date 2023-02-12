const expect = require("chai").expect
const request = require("request")
const chai = require('chai'), chaiHttp = require('chai-http');
var superagent = require('superagent');
var agent = superagent.agent();

chai.use(chaiHttp);

const app = require("../src/server.js")
const port = 3001

before("Start Server", (done) => {
    server = app.listen(port, () => {
        //console.log(`Server listening on localhost:${port}`)
        done();
    })
})

beforeEach("Login as testaaja", (done) => {
        agent
        .post('http://localhost:3001/home/login')
        .send({
            username: 'testaaja',
            password: 'test'
        })
        .end(function(err, res) {
            console.log(res.statusCode);
            if (expect(res.statusCode).to.equal(200))
                return done();
            else {
                return done(new Error("The login is not happening"));
                    }
        });
    });

describe("Check my-collection view responses", () => {
    const url = `http://localhost:${port}/collections/my-collection`;

    it("returns status code 200", (done) => {
        request(url, (error, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    })
})


        
after("Close Server", (done) => {
    server.close();
    //console.log("Server closed")
    done();
})