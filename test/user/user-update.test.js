import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "../test-util.js";
import bcrypt from "bcrypt";

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser()
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update current user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'opal',
                password: 'diupdate'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('opal');

        const getUser = await getTestUser();
        expect(await bcrypt.compare("diupdate", getUser.password)).toBe(true);

    })
    it('should can update only name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'opal',
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('opal');
    })

    it('should can update only password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'diupdate',
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');

        //need compare the password using bcrypt because we already hasing the password
        const getUser = await getTestUser();
        expect(await bcrypt.compare("diupdate", getUser.password)).toBe(true);
    })

    it('should reject update current user because not valid authorization', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'salah')
            .send({});

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    })

    it('should reject update current user because empty', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: '',
                password: '',
            });
        const message = result.text.match(/Error: .*?(?=<br>)/)[0]
        logger.info(message);

        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
    })

});
