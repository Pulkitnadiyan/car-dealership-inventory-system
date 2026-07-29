const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

describe("PUT /api/vehicles/:id", () => {

    let vehicle;

    beforeEach(async () => {
        await prisma.vehicle.deleteMany();

        vehicle = await prisma.vehicle.create({
            data: {
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5
            }
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should update a vehicle", async () => {

        const response = await request(app)
            .put(`/api/vehicles/${vehicle.id}`)
            .send({
                price: 5000000,
                quantity: 8
            });

        expect(response.status).toBe(200);
        expect(response.body.price).toBe(5000000);
        expect(response.body.quantity).toBe(8);

    });

});