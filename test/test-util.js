import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'test'
        }
    })
}

export const removeAllTestContact = async () => {
    return prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const createTestContact = async () => {
    return prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@mail.com",
            phone: "08000009"
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: 'test',
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@mail.com`,
                phone: `0800009${i}`
            }
        })
    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

export const removeAllAddressed = async () => {
    return prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "test"    
            }
        }
    })
}