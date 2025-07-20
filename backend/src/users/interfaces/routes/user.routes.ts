import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateData } from "../middlewares/validate.middleware";
import { UserSchema } from "../middlewares/schema.middleware";
import { Pagination } from "../middlewares/paginate.middleware";

/** Se definen las rutas del controlador de usuarios, para exponerlas **/
export const userRouter = (controller: UserController) =>
{
    const router = Router();

    router.get('/users',Pagination,(req, res, next) => (controller.listUser(req, res, next)));
    router.post('/user',validateData(UserSchema),(req, res, next) => (controller.create(req, res,next)));
    router.put('/user',controller.update.bind(controller));
    router.delete('/user', controller.delete.bind(controller));

    return router;
}