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
            
            return await this.userRepository.delete(id);

        }catch(error)
        {
            const message = error instanceof Error ? error.message: UserMessages.ERROR.ERROR_DELETE;
            throw new Error(message);
        }
    }
}