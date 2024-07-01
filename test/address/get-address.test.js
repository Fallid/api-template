import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeTestAllAddressed, removeAllTestContact, removeTestUser, createTestAddress, getTestAddress } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('GET /api/contacts/:contactsId/addresses/:addressId', function () {
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

    it('should can get contacts', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + testContactBody.id + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("test jalan")
        expect(result.body.data.city).toBe("test kota")
        expect(result.body.data.province).toBe("test provinsi")
        expect(result.body.data.country).toBe("test negara")
        expect(result.body.data.postal_code).toBe("03032003")
    })

    it('should reject contacts information if invalid authorization', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + testContactBody.id + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'salah')

        logger.error(result.body.errors)

        expect(result.status).toBe(401)
        expect(result.error).toBeDefined()
    })

    it('should reject contacts information if contact is not found ', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id + 1) + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.info(message);

        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should reject contacts information if address is not found ', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id + 1))
            .set('Authorization', 'test')

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.error(message);

        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should reject contacts information if contact and address is not found ', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .get('/api/contacts/' + (testContactBody.id + 1) + '/addresses/' + (testAddressBody.id + 1))
            .set('Authorization', 'test')

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.error(message);

        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })
})