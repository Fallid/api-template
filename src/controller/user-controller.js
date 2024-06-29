import userService from "../service/user-service.js"

const register = async (req, resp, next) => {
    try {
        const result = await userService.register(req.body);
        resp.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}


const login = async (req, resp, next) => {
    try {
        const result = await userService.login(req.body);
        resp.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const get = async (req, resp, next) => {
    try {
        const username = req.user.username;
        const result = await userService.get(username);
        resp.status(200).json({
            data: result
        });

    } catch (error) {
        next(error)
    }
}

const update = async(req, resp, next)=>{
    try {
        const username = req.user.username;
        const request = req.body;
        request.username = username;

        const result = await  userService.update(request);
        resp.status(200).json({
            data:result
        });
    } catch (error) {
        next(error);
    }
}
export default { register, login, get, update }