const request = require("supertest");
const app = require("../../app");
const prisma = require("../../config/prisma");

const getAdminToken = async () => {

    const email = "admin@example.com";
    const password = "password123";

    await prisma.user.deleteMany({
        where: { email }
    });

    await request(app)
        .post("/api/auth/register")
        .send({
            username: "Admin",
            email,
            password
        });

    // Promote the user to ADMIN
    await prisma.user.update({
        where: { email },
        data: {
            role: "ADMIN"
        }
    });

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email,
            password
        });

    return response.body.token;
};

module.exports = getAdminToken;