import { Router } from "express";
import { getAllUsers, login, signup, persistLogin, logout } from "../controllers/userControllers.js";
import { userLoginValidator, userSignupValidator, checkValidation} from "../utils/validationMiddleware.js";
import { verifyToken } from "../utils/token.js";

const userRouter = Router({ mergeParams: true });

userRouter.route('/')
    .get(getAllUsers)

userRouter.route('/inscription')
    .post(checkValidation(userSignupValidator), signup)

userRouter.route('/connexion')
    .post(checkValidation(userLoginValidator), login)

userRouter.route('/logout')
    .post(verifyToken, logout)

userRouter.route('/auth-status')
    .get(verifyToken, persistLogin)

export default userRouter;