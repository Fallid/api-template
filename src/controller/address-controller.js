import addressService from "../service/address-service.js";

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

const update = async (req, resp, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId
        const addressId = req.params.addressId;
        request.id = addressId;

        const result = await addressService.update(user, contactId, request)
        resp.status(200).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
} 

const remove = async(req, resp, next) => {
    try {
        const user =  req.user;
        const contactId =  req.params.contactId;
        const addressId = req.params.addressId;
        
        await addressService.remove(user, contactId, addressId)
        resp.status(200).json({
            data: "Remove Success"
        })

    } catch (error) {
        next(error)
    }
}

const list = async(req, resp, next) => {
    try {
        const user =  req.user;
        const contactId =  req.params.contactId;
        
        const result =  await addressService.list(user, contactId)
        resp.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    list
}