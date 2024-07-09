import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })
    
    it('should can get contacts', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .get('/api/contacts/' + testContactBody.id)
            .set('Authorization', 'test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContactBody.id);
        expect(result.body.data.first_name).toBe(testContactBody.first_name);
        expect(result.body.data.last_name).toBe(testContactBody.last_name);
        expect(result.body.data.email).toBe(testContactBody.email);
        expect(result.body.data.phone).toBe(testContactBody.phone);
    })
    it('should reject if invalid authorization ', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .get('/api/contacts/' + testContactBody.id)
            .set('Authorization', 'salah')

        logger.error(result.body.errors)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if contact is not found ', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id + 1))
            .set('Authorization', 'test')

        logger.error(result.body.errors)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined();
    })
})