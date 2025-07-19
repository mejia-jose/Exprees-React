import { UserMessages } from "../../../shared/constants/messages";
import { IUserRepository } from "../../domain/ports/user.repository.interface";

export class ListUserUseCase
{
    constructor(private readonly userRepo: IUserRepository){}

    /**Permite obtener el listado de usuarios **/
    async getUsers(pageNumber: 1, pageElements: 10)
    {
        try 
        {
            const users = await this.userRepo.listAll(pageNumber, pageElements);

            const total = await this.userRepo.countAll();
            return { records: users, total, pageNumber,pageElements };

        } catch (error:any) 
        {    
          throw new Error(UserMessages.ERROR.ERROR_OPERATION_LIST_USERS);
        }
    }
}