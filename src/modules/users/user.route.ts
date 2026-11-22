import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router()

router.post('/', userController.createUser)
router.get('/', auth, userController.getUser)
router.get('/:id', userController.singleGetUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRouter = router