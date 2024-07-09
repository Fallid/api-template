import contactService from "../service/contact-service.js"

const create = async (req, resp, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await contactService.create(user, request);
        resp.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const get = async (req, resp, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const result = await contactService.get(user, contactId);
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
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;

        const result = await contactService.update(user, request);
        resp.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, resp, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;

        await contactService.remove(user, contactId)
        resp.status(200).json({
            data: "Remove Success"
        })
    } catch (error) {
        next(error)
    }
}

const search = async (req, resp, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }
        const result = await contactService.search(user, request);
        resp.status(200).json({
            data: result.data,
            paging: result.pagging
        })
    } catch (error) {
        next(error)
    }
}

export default { create, get, update, remove, search }