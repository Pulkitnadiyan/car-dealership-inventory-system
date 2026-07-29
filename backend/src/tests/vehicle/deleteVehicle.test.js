const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");
const getAdminToken = require("../helpers/getAdminToken");

describe("DELETE /api/vehicles/:id", () => {

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

    it("should delete a vehicle", async () => {

        const token = await getAdminToken();

        const response = await request(app)
            .delete(`/api/vehicles/${vehicle.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        const deletedVehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicle.id
            }
        });

        expect(deletedVehicle).toBeNull();

    });

});