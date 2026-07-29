const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");
const getAdminToken = require("../helpers/getAdminToken");

describe("POST /api/vehicles/:id/restock", () => {

    let vehicle;
    let token;

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

        token = await getAdminToken();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should restock a vehicle", async () => {

        const response = await request(app)
            .post(`/api/vehicles/${vehicle.id}/restock`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 10
            });

        expect(response.status).toBe(200);

        const updatedVehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicle.id
            }
        });

        expect(updatedVehicle.quantity).toBe(15);

    });

});