const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");
const getAuthToken = require("../helpers/getAuthToken");

describe("Admin Authorization", () => {

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

    it("should return 403 if user is not an admin", async () => {

        const token = await getAuthToken();

        const response = await request(app)
            .delete(`/api/vehicles/${vehicle.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(403);

    });

});