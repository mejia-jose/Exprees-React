import { UserMessages } from "../../../shared/constants/messages";
import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { MapResponse } from "../../../shared/responses/response";

export class CreateUserUseCase
{
    /** Se inyecta la interfaz del repositorio de usuarios **/
    constructor(private readonly userRepo: IUserRepository){}

    /** Permite ejecutar el caso de uso de crear usuario **/
    async run(user: CreateUserDTO)
    {
        try
        {
            const { name, lastname,username, hasPassport, birthday, age} = user;
            const userInstances = new UserEntity(name,lastname,username,birthday,hasPassport,age);
            const result = await this.userRepo.save(userInstances);

            if(!result)
            {
                return MapResponse.ResultJson(false, UserMessages.ERROR.ERROR_CREATE);
            }

            return MapResponse.ResultJson(true, UserMessages.SUCCESS.USER_CREATE);
            
        } catch (error) 
        {
          const errorMessages = error instanceof Error ? error.message : String(error);
          return MapResponse.ResultJson(false, UserMessages.ERROR.ERROR_OPERATION_SAVE, errorMessages); 
        }
    }
}