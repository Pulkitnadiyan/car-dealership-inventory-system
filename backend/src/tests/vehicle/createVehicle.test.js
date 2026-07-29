const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

describe("POST /api/vehicles", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should create a vehicle", async () => {

        const response = await request(app)
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });

});