const request = require("supertest");
const bcrypt = require("bcrypt");
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

    it("should hash the password before saving", async () => {

        const plainPassword = "password123";

        await request(app)
            .post("/api/auth/register")
            .send({
                username: "Rahul",
                email: "rahul@example.com",
                password: plainPassword
            });

        const user = await prisma.user.findUnique({
            where: {
                email: "rahul@example.com"
            }
        });

        expect(user).not.toBeNull();
        expect(user.password).not.toBe(plainPassword);

        const isMatch = await bcrypt.compare(
            plainPassword,
            user.password
        );

        expect(isMatch).toBe(true);
    });

    it("should not allow duplicate email registration", async () => {

        const user = {
            username: "Pulkit",
            email: "pulkit@example.com",
            password: "password123"
        };


        await request(app)
            .post("/api/auth/register")
            .send(user);


        const response = await request(app)
            .post("/api/auth/register")
            .send(user);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
            success: false,
            message: "Email already exists"
        });

    });

});