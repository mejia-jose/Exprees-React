import express  from "express";
import cors from "cors";

import { UserRepository } from "./users/infrastructure/repositories/user.repository";
import { CreateUserUseCase } from "./users/application/use_cases/create-user.usecase";
import { ListUserUseCase } from "./users/application/use_cases/list-user-usercase";
import { UpdateUserUseCase } from "./users/application/use_cases/update-user.usecase";
import { DeleteUserUseCase } from "./users/application/use_cases/delete-user.usecase";
import { UserController } from "./users/interfaces/controllers/user.controller";
import { userRouter } from "./users/interfaces/routes/user.routes";
import { captureGeneralError } from "./users/interfaces/middlewares/error.middleware";

const app = express()
app.use(cors());
app.use(express.json());
const port = 3000;

/** Se instancia el repositorio de la entida User **/
const userRepository = new UserRepository();

/** Se instancian los casos de uso y se les inyecta el repositorio **/
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUserUseCase = new ListUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

/** Se instancia el controllador de User y se le inyectan los casos de uso**/
const userController = new UserController(
  createUserUseCase,
  listUserUseCase, 
  updateUserUseCase, 
  deleteUserUseCase
);

/** Se intancian las rutas para hacer uso del controller de usuarios**/
const userRoutes = userRouter(userController);

app.use('/api',userRoutes);
app.use(captureGeneralError);

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto: ${port}`)
})
