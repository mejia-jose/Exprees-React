import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";
import { UpdateUserDTO } from "../dtos/create-user.dto";
import { UserMessages } from "../../../shared/constants/messages";

export class UpdateUserUseCase
{
    /** Se inyecta la interfaz del repositorio de usuarios **/
    constructor(private readonly userRepository: IUserRepository){}

    /** Permite ejecutar el caso de uso de actualizar la información de un usuario **/
    async execute(user: UpdateUserDTO): Promise<UserEntity>
    {
        try
        {
            if(!user.id)
            {
                throw new Error(UserMessages.ERROR.ID_IS_REQUIRED);
            }

            /** Se consulta y se valida que el usuario exista **/
            const userExists = await this.userRepository.findById(user.id);
            if(!userExists)
            {
                throw new Error(UserMessages.ERROR.NOT_FOUND);
            }

            /** Se aplica el object assign para realizar la actulización parcial **/
            const updateUser = Object.assign({}, userExists, user);

            return this.userRepository.update(updateUser);

        } catch (error) 
        {
           const message = error instanceof Error ? error.message: UserMessages.ERROR.ERROR_UPDATE;
           throw new Error(message);
        }
    }    
}