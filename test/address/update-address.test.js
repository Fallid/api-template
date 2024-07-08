import supertest from "supertest";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestContact, removeTestAllAddressed, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('PUT /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress()
    })

    afterEach(async () => {
        await removeTestAllAddressed();
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can update address', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .put('/api/contacts/' + testContactBody.id + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')
            .send({
                street: "test jalan update",
                city: "test kota update",
                province: "test provinsi update",
                country: "test negara update",
                postal_code: "20030303"
            })
        logger.info(result)
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testAddressBody.id)
        expect(result.body.data.street).toBe('test jalan update')
        expect(result.body.data.city).toBe('test kota update')
        expect(result.body.data.province).toBe('test provinsi update')
        expect(result.body.data.country).toBe('test negara update')
        expect(result.body.data.postal_code).toBe('20030303')
    })

    it('should cant update address if contactId is not found', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContactBody.id + 1) + '/addresses/' + testAddressBody.id)
            .set('Authorization', 'test')
            .send({
                street: "test jalan update",
                city: "test kota update",
                province: "test provinsi update",
                country: "test negara update",
                postal_code: "20030303"
            })

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.error(message);
        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should cant update address if addressId is not found', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id + 1))
            .set('Authorization', 'test')
            .send({
                street: "test jalan update",
                city: "test kota update",
                province: "test provinsi update",
                country: "test negara update",
                postal_code: "20030303"
            })

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.error(message);
        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })

    it('should cant update address if invalid authorization', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id))
            .set('Authorization', 'salah')
            .send({
                street: "test jalan update",
                city: "test kota update",
                province: "test provinsi update",
                country: "test negara update",
                postal_code: "20030303"
            })

        logger.error(result.body.errors);
        expect(result.status).toBe(401)
        expect(result.error).toBeDefined()
    })

    it('should cant update address if invalid authorization', async () => {
        const testContactBody = await getTestContact();
        const testAddressBody = await getTestAddress();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContactBody.id) + '/addresses/' + (testAddressBody.id))
            .set('Authorization', 'test')
            .send({
                street: "",
                city: "",
                province: "test provinsi update",
                country: "",
                postal_code: "20030303030303"
            })

        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.error(message);
        expect(result.status).toBe(400)
        expect(result.error).toBeDefined()
    })
})