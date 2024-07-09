import supertest from "supertest";
import { createTestUser, removeAllTestContact, removeTestUser } from "../test-util.js";
import { web } from "../../src/application/web.js";
import { logger } from "../../src/application/logging.js";

describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name:  "test",
                last_name: "test",
                email: "test@mail.com",
                phone:"123456789"
            })

            logger.info(result.body)

            expect(result.status).toBe(200);
            expect(result.body.data.id).toBeDefined();
            expect(result.body.data.first_name).toBe("test");
            expect(result.body.data.last_name).toBe("test");
            expect(result.body.data.email).toBe("test@mail.com");
            expect(result.body.data.phone).toBe("123456789");  
    })
    
    it('should cant create new contact if invalid authorization', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'salah')
            .send({
                first_name:  "",
                last_name: "test",
                email: "test@mail.com",
                phone:"123456789012345678901"
            })
            logger.error(result.body.errors)

            expect(result.status).toBe(401);
            expect(result.error).toBeDefined();  
    })

    it('should cant create new contact if request is not valid', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name:  "",
                last_name: "test",
                email: "test@mail.com",
                phone:"123456789012345678901"
            })
            logger.error(result.body.errors)

            expect(result.status).toBe(400);
            expect(result.error).toBeDefined();  
    })

});
