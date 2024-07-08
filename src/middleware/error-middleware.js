import { ResponseError } from "../error/response-error.js"

const errorMiddleware = async (err ,req, resp, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        resp.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        resp.status(500).json({
            errors: err.message
        }).end();
    }
}

export { errorMiddleware }