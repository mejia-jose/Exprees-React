import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateData } from "../middlewares/validate";
import { UserSchema } from "../middlewares/schema.middleware";

/** Se definen las rutas del controlador de usuarios, para exponerlas **/
export const userRouter = (controller: UserController) =>
{
    const router = Router();

    router.get('/users',(req, res, next) => (controller.listUser(req, res, next)));
    router.post('/user',validateData(UserSchema),(req, res, next) => (controller.create(req, res,next)));

    return router;
}