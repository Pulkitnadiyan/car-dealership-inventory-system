const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

describe("POST /api/auth/login", () => {

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should login successfully with valid credentials", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                username: "Pulkit",
                email: "pulkit@example.com",
                password: "password123"
            });

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "pulkit@example.com",
                password: "password123"
            });

        expect(response.status).toBe(200);

    });

});