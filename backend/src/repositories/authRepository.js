const prisma = require("../config/prisma");

const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData,
    });
};

module.exports = {
    createUser,
};