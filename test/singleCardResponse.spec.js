// const chaiEnzyme = require("chai-enzyme")
// const expect = require("chai").expect
// const request = require("request")

// const app = require("../src/server.js")
// const port = 3001
// describe("Single card data", () => {

//     describe("Card Data", () => {
//         const url = `http://localhost:${port}/my-collection/9fca4c4f-a77b-483e-9da4-574ba2e3d179`;

//         it("has correct data", (done) => {
//             request(url, (error, response, body) => {
//                 //expect(response.statusCode).to.equal(200);
//                 body = JSON.stringify(body);
//                 //console.log(body)
//                 expect(body).to.contain("Academy Loremaster")
//                 expect(body).to.contain("Dominaria United")
//                 expect(body).to.contain("rare")
//                 expect(body).to.contain("https://cards.scryfall.io/normal/front/9/f/9fca4c4f-a77b-483e-9da4-574ba2e3d179.jpg?1663047648")
//                 done();
//             })
//         })
//     })

//     after("Close Server", (done) => {
//         server.close();
//         //console.log("Server closed")
//         done();
//     })
// })