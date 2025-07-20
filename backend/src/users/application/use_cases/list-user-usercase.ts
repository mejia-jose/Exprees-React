import { UserMessages } from "../../../shared/constants/messages";
import { IUserRepository } from "../../domain/ports/user.repository.interface";

export class ListUserUseCase
{
    constructor(private readonly userRepository: IUserRepository){}

    /**Permite obtener el listado de usuarios **/
    async getUsers(pageNumber: number, pageElements: number)
    {
        try 
        {
            const users = await this.userRepository.listAll(pageNumber, pageElements);
            const total = await this.userRepository.countAll();

            return { records: users, total, pageNumber,pageElements };

        } catch (error:any) 
        {    
          const message = error instanceof Error ? error.message: UserMessages.ERROR.ERROR_OPERATION_LIST_USERS;
          throw new Error(message);
        }
    }
}