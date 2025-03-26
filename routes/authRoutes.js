import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { validateMiddleware, validateToken } from "../middleware/validationUser.js";

export const createAuthController = ({authModel}) =>{
    const controller = new authController({authModel : authModel});
    const authRoutes = Router()

    authRoutes.get('/', validateToken, controller.index);
    authRoutes.post('/login', validateMiddleware, controller.login);
    authRoutes.post('/register', validateMiddleware, controller.register);
    authRoutes.get('/data', validateToken, controller.data);
    authRoutes.post('/logout', validateToken, controller.logout);
    authRoutes.get('/protected', validateToken, controller.protected);

    return authRoutes;
}