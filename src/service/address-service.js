import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation } from "../validation/address-validation";
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, contactId, request) => {
    // validating contactId before create a request
    contactId = validate(getContactValidation, contactId);

    // checking the contacts is not null in database
    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        },
    })

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact is not found");
    }

    // validating address request
    const address = validate(createAddressValidation, request)
    // create foreign key contact_id
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true   
        }
    })
}

export default{
    create
}