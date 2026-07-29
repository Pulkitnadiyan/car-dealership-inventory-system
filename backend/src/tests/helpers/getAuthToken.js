const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

const getAuthToken = async () => {

    const email = "admin@example.com";
    const password = "password123";

    await prisma.user.deleteMany({
        where: {
            email
        }
    });

    await request(app)
        .post("/api/auth/register")
        .send({
            username: "Admin",
            email,
            password
        });

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password
        });

    return response.body.token;
};

module.exports = getAuthToken;