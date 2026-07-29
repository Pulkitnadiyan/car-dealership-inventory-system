const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

describe("POST /api/auth/register", () => {

    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should save the user in database", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                username: "Pulkit",
                email: "pulkit@example.com",
                password: "password123"
            });

        const user = await prisma.user.findUnique({
            where: {
                email: "pulkit@example.com"
            }
        });

        expect(user).not.toBeNull();
        expect(user.email).toBe("pulkit@example.com");
    });

});