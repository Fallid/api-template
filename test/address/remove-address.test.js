import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeTestAllAddressed, removeAllTestContact, removeTestUser, createTestAddress, getTestAddress } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('DELETE /api/contacts/:contactId/addresses/:addressId', function () {
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

    it('should can remove address', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContactBody.id + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')

        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data).toBe('Remove Success')
    })

    it('should cant remove address if contact is not found', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testContactBody.id + 1) + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')
        
        logger.error(result.body.errors);
        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should cant remove address if address is not found', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id + 1))
            .set('Authorization', 'test')
        
        logger.error(result.body.errors);
        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should cant remove address if invalid authorization', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id))
            .set('Authorization', 'salah')

        logger.error(result.body);
        expect(result.status).toBe(401)
        expect(result.error).toBeDefined()
    })
})