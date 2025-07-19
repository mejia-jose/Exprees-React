import { Router } from "express";

import { UserController } from "../controllers/user.controller";

/** Se definen las rutas del controlador de usuarios, para exponerlas **/
export const userRouter = (controller: UserController) =>
{
    const router = Router();

    router.get('/users',controller.listUser);
    router.post('/user',controller.create)

    return router;
}