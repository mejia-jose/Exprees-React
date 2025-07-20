import { UserMessages } from "../../../shared/constants/messages";
import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";

export class CreateUserUseCase
{
    /** Se inyecta la interfaz del repositorio de usuarios **/
    constructor(private readonly userRepository: IUserRepository){}

    /** Permite ejecutar el caso de uso de crear usuario **/
    async execute(user: CreateUserDTO):Promise<UserEntity>
    {
        try
        {
            const { name, lastname,username, hasPassport, birthday, age} = user;
            const userInstances = new UserEntity(name,lastname,username,birthday,hasPassport,age);
            return await this.userRepository.save(userInstances);
            
        } catch (error) 
        {
          throw new Error(UserMessages.ERROR.ERROR_CREATE);
        }
    }
}