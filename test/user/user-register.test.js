import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";
import { removeTestUser } from "../test-util.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser()
    });

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

    });
    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            });
        logger.error(result.body.errors)

        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();

    });
});