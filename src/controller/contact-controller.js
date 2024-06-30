import contactService from "../service/contact-service"

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

export default { create, get, update }