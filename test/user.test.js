import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "pal_opal"
            }
        })
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'pal_opal',
                password: 'rahasia',
                name: 'Ahmad Naufal'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("pal_opal");
        expect(result.body.data.name).toBe("Ahmad Naufal");
        expect(result.body.data.password).toBeUndefined();
    });
});