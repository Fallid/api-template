import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "../test-util.js";

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await createTestUser()
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('Logout Success');

        const user = await getTestUser();
        expect(user.token).toBeNull();

    })
    
    it('should cant logout if token invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        logger.info(result.body);

        expect(result.status).toBe(401);
    })
});