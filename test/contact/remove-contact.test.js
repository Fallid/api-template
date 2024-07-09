import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can remove existing contact', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContactBody.id)
            .set('Authorization', 'test')

        logger.info(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data).toBe('Remove Success')
    })

    it('should reject remove contact if is not valid', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContactBody.id)
            .set('Authorization', 'salah')

        logger.error(result.body.errors)

        expect(result.status).toBe(401);
    })

    it('should reject remove contact if is not valid', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContactBody.id + 1)
            .set('Authorization', 'test')

        logger.error(result.body.errors)
        expect(result.status).toBe(404);
        expect(result.error).toBeDefined();
    })

})