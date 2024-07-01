import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllAddressed, removeAllTestContact, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('POST /api/contacts/:contactsId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllAddressed();
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can create new address', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .post('/api/contacts/' + testContactBody.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "test jalan",
                city: "test kota",
                province: "test provinsi",
                country: "test negara",
                postal_code: "03032003"
            })
        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.street).toBe("test jalan")
        expect(result.body.data.city).toBe("test kota")
        expect(result.body.data.province).toBe("test provinsi")
        expect(result.body.data.country).toBe("test negara")
        expect(result.body.data.postal_code).toBe("03032003")
    })

    it('should reject create address if request is unauthorize', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .post('/api/contacts/' + testContactBody.id + '/addresses')
            .set('Authorization', 'salah')
            .send({
                street: "test jalan",
                city: "test kota",
                province: "test provinsi",
                country: "test negara",
                postal_code: "03032003"
            })
        logger.info(result.body)
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject create address if request is invalid', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .post('/api/contacts/' + testContactBody.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "",
                city: "",
                province: "",
                country: "",
                postal_code: "030320030303"
            })
        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.info(message);
        expect(result.status).toBe(400)
        expect(result.error).toBeDefined()
    })

    it('should reject create address if request is not found', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .post('/api/contacts/' + testContactBody.id + 1 + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: "",
                city: "",
                province: "",
                country: "",
                postal_code: "030320030303"
            })
        const message = result.text.match(/Error: .*?(?=<br>)/)[0]

        logger.info(message);
        expect(result.status).toBe(404)
        expect(result.error).toBeDefined()
    })
})