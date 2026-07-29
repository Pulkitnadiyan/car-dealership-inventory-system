const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");
const getAuthToken = require("../helpers/getAuthToken");

describe("POST /api/vehicles/:id/purchase", () => {

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

        token = await getAuthToken();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should purchase a vehicle", async () => {

        const response = await request(app)
            .post(`/api/vehicles/${vehicle.id}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        const updatedVehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicle.id
            }
        });

        expect(updatedVehicle.quantity).toBe(4);

    });

});