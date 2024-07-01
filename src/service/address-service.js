import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation, getAddressValidation } from "../validation/address-validation";
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContactMustExist = async (user, contactId) => {
    // validating contact id
    contactId = validate(getContactValidation, contactId)

    //checking if contact is not null in database
    const totalCountContact = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (totalCountContact !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return contactId;
}

const create = async (user, contactId, request) => {
    // validating contactId before create a request
    contactId = await checkContactMustExist(user, contactId);

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

const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExist(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!address) {
        throw new ResponseError(404, "Address is not found")
    }

    return address
}

export default {
    create,
    get
}