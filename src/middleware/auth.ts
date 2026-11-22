import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/index.js";
import { pool } from "../db/index.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("this is protected route")
    // console.log(req.headers.authorization)

    const token = req.headers.authorization

    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorize Access",
        });
    }

    const decode = jwt.verify(token as string, config.jwt_Secret) as JwtPayload
    // console.log(decode)

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decode.email])

    // console.log(user.rows[0])

    if (user.rowCount === 0) {
        res.status(404).json({
            success: false,
            message: "User Not Found!!",
        });
    }

    if (!user.rows[0].is_active) {
        res.status(403).json({
            success: false,
            message: "Forbidden!!",
        });
    }


    next()
}