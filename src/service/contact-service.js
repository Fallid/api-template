import { prismaClient } from "../application/database";
import { createContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    //validating contact request
    const contact = validate(createContactValidation, request);
    // get foreign key from user table
    contact.username = user.username

    return prismaClient.contact.create({
        data:contact,
        select:{
            id:true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

export default {
    create
}