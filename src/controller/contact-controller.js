import contactService from "../service/contact-service"

const create = async(req, resp, next)=>{
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

export default {create}