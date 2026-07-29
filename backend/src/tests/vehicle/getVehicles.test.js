const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

describe("GET /api/vehicles", () => {

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();

        await prisma.vehicle.createMany({
            data: [
                {
                    make: "Toyota",
                    model: "Fortuner",
                    category: "SUV",
                    price: 4500000,
                    quantity: 5
                },
                {
                    make: "Honda",
                    model: "City",
                    category: "Sedan",
                    price: 1800000,
                    quantity: 10
                }
            ]
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should return all vehicles", async () => {

        const response = await request(app)
            .get("/api/vehicles");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);

    });

});