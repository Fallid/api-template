import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";


describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can update existing contact', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .put('/api/contacts/' +  testContactBody.id)
            .set('Authorization', 'test')
            .send({
                first_name:  "update",
                last_name: "update",
                email: "update@mail.com",
                phone:"08080808"
            })

            logger.info(result.body)

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.first_name).toBe("update");
            expect(result.body.data.last_name).toBe("update");
            expect(result.body.data.email).toBe("update@mail.com");
            expect(result.body.data.phone).toBe("08080808");  
    })

    it('should reject update if auth invalid', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .put('/api/contacts/' +  testContactBody.id)
            .set('Authorization', 'salah')
            .send({
                first_name:  "update",
                last_name: "update",
                email: "update@mail.com",
                phone:"08080808"
            })

            logger.info(result.body)

            expect(result.status).toBe(401);
            expect(result.body.errors).toBeDefined();  
    })

    it('should reject update if request invalid', async () => {
        const testContactBody = await getTestContact();
        const result = await supertest(web)
            .put('/api/contacts/' +  testContactBody.id)
            .set('Authorization', 'test')
            .send({
                first_name:  "",
                last_name: "update",
                email: "update@mail.com",
                phone:"08080808008080808080808"
            })
            const message = result.text.match(/Error: .*?(?=<br>)/)

            logger.info(message);

            expect(result.status).toBe(400);
            expect(result.error).toBeDefined();  
    })
})