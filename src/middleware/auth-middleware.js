import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, resp, next) => {
    const token = req.get('Authorization');
    if (!token) {
        resp.status(401).json({
            errors: "Unauthorized"
        }).end();
    }else{
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        if(!user){
            resp.status(401).json({
                errors: "Unauthorized"
            }).end();
        }else{
            req.user = user;
            next()
        }
    }
}