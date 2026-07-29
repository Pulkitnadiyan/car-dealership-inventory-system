const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: "Pulkit",
                email: "pulkit@gmail.com",
                password: "12345678"
            });

        expect(response.status).toBe(201);
    });
});