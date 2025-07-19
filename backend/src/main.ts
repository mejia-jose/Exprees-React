import express  from "express";

import { UserRepository } from "./users/infrastructure/repositories/user.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { ListUserUseCase } from "./users/application/use_cases/list-user-usercase";
import { UserController } from "./users/interfaces/controllers/user.controller";
import { userRouter } from "./users/interfaces/routes/user.routes";

const app = express()
app.use(express.json());
const port = 3000;

/** Se instancia el repositorio de la entida User **/
const userRepository = new UserRepository();

/** Se instancian los casos de uso y se les inyecta el repositorio **/
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUserUseCase = new ListUserUseCase(userRepository);

/** Se instancia el controllador de User **/
const userController = new UserController(createUserUseCase,listUserUseCase);

/** Se intancian las rutas para hacer uso del controller **/
const userRoutes = userRouter(userController);

app.use('/api',userRoutes);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto: ${port}`)
})
