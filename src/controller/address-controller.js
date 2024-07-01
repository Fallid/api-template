import addressService from "../service/address-service";

const create = async (req, resp, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId

        const result = await addressService.create(user, contactId, request)
        resp.status(200).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const get = async (req, resp, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const result = await addressService.get(user, contactId, addressId)
        resp.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get
}