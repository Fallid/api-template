import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeTestAllAddressed, removeAllTestContact, removeTestUser, createTestAddress, getTestAddress } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('GET /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })

    afterEach(async () => {
        await removeTestAllAddressed();
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can list addresses', async () => {
        const testContactBody = await getTestContact()

        const result = await supertest(web)
            .get('/api/contacts/' + testContactBody.id + '/addresses')
            .set('Authorization', 'test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
    })

    it('should cant list addresses if contact is not found', async () => {
        const testContactBody = await getTestContact()

        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id + 1) + '/addresses')
            .set('Authorization', 'test')

        logger.info(result.body.errors)

        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should cant list addresses if invalid authorization', async () => {
        const testContactBody = await getTestContact()

        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id + 1) + '/addresses')
            .set('Authorization', 'salah')

        logger.info(result.body.errors)

        expect(result.status).toBe(401)
        expect(result.error).toBeDefined()
    })
})