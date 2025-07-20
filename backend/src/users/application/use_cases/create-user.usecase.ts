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
            
            if(!this.calculateAge(birthday,age))
            {
                throw new Error(UserMessages.ERROR.ERROR_AGE);
            }
            
            /** Valida que el username no exista, es decir que no pertenezca a otro usuario **/
            const usernameExist = await this.userRepository.findUserByUserName(username);
            if(usernameExist)
            {
               throw new Error(UserMessages.ERROR.ERROR_USERNAME_EXIST);
            }

            const userInstances = new UserEntity(name,lastname,username,birthday,hasPassport,age);
            return await this.userRepository.save(userInstances);
            
        } catch (error) 
        {
           const message = error instanceof Error ? error.message: UserMessages.ERROR.ERROR_CREATE;
           throw new Error(message);
        }
    }

    /** Permite calcular la edad del usuario por medio de la fecha de naciemineto **/
    private calculateAge(birthday: string | Date, age:number)
    {
       const birth = new Date(birthday);  
       const currentDate = new Date();

       let diffYear = currentDate.getFullYear() - birth.getFullYear();
       const diffMounth = currentDate.getMonth() - birth.getMonth();
       const diffDay = currentDate.getDate() - birth.getDate();
       
       if(diffMounth < 0 || (diffMounth === 0 && diffDay < 0))
       {
         diffYear--;
       }

       return diffYear === age;
    }
}