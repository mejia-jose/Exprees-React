import { IUserRepository } from "../../domain/ports/user.repository.interface";
import { UserMessages } from "../../../shared/constants/messages";

export class DeleteUserUseCase
{
    /** Se inyecta la interfaz del repositorio de usuarios **/
    constructor(private readonly userRepository: IUserRepository){}

    /** Permite ejecutar el caso de uso de eliminar la información de un usuario **/
    async execute(id: string)
    {
        try
        {
            if(!id)
            {
                throw new Error(UserMessages.ERROR.ID_IS_REQUIRED);
            }

            /** Se consulta y se valida que el usuario exista **/
            const userExists = await this.userRepository.findById(id);
            if(!userExists)
            {
                throw new Error(UserMessages.ERROR.NOT_FOUND);
            }

            return await this.userRepository.delete(id);

        }catch(error)
        {
            throw new Error(UserMessages.ERROR.ERROR_DELETE);
        }
    }
}