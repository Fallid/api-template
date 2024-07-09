import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";
import { createTestUser, removeTestUser } from "../test-util.js";

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if username and password is empty or invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });
        logger.error(result.body.errors)

        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
    });
    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "rahasia"
            });
        logger.error(result.body.errors)

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });
    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });
        logger.error(result.body.errors)

        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });
});