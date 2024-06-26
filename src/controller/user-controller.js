import e from "express";
import userService from "../service/user-service.js"

const register = async (req, resp, next) => {
    try {
        const result = await userService.register(req.body);
        resp.status(200).json({
            data: result
        });
    } catch (error) {
        next(e);
    }
}

export default { register }