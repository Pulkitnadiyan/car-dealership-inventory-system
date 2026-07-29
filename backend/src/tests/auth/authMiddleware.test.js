const request = require("supertest");
const app = require("../../app");

describe("Protected Route", () => {

    it("should return 401 if token is missing", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5
            });

        expect(response.status).toBe(401);

    });

});