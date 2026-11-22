import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sencResponse.js";

const loginUser = async(req: Request, res: Response) => {

    try{
        const result = await authService.loginUserFromDB(req.body)
        // console.log(result)

        const {refreshToken} = result

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
          sameSite: "lax",
          // maxAge: 
          path: "/",
          domain: "localhost"
        })

        sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully!",
      data: result,
    });
    }
    catch (error: any) {
   sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
      error: error,
    });
  }
}


const generateToken = async(req: Request, res: Response) => {

    try{
        const result = await authService.generateAccessToken(req.cookies.refreshToken)
        // console.log(result)


        res.status(200).json({
        success: true,
        message: "AccessToken Successfully",
        data: result,
        });
    }
    catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      data: error,
    });
  }
}


export const authController = {
    loginUser,
    generateToken
}