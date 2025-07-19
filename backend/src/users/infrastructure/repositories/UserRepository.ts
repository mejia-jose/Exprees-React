import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/ports/IUserRepository";
import { UserMessages } from "../../../shared/constants/messages";

export class UserRepository implements IUserRepository
{
    private users: Map<string, UserEntity>;

    constructor()
    {
        this.users = new Map();
    }

    /** Permite obtener el listado de usuarios guardados **/
    async listAll(pageNumber: number, pageElements: number): Promise<UserEntity[]> 
    {
        const users = Array.from(this.users.values());
        const pageStart = (pageNumber -1) * pageElements;
        const pageEnd = pageStart + pageElements;

        return users.slice(pageStart,pageEnd);
    }

    /**Permite obtener el total de usuarios registrados **/
    async countAll(): Promise<number> 
    {
        return this.users.size;
    }

    /** Permite guardar la información de un nuevo usuario **/
    async save(user: UserEntity):Promise<UserEntity>
    {
       try 
       {
         this.users.set(user.id, user);
         if(!this.users.has(user.id))
         {
            throw new Error(UserMessages.ERROR.ERROR_CREATE);
         }

         return user;
        
       } catch (error) {
          throw new Error(UserMessages.ERROR.ERROR_OPERATION_SAVE+error);
       }
    }

    /** Permite actualizar la información de un usuario **/
    async update(user: UserEntity): Promise<UserEntity> 
    {
        const userExists = await this.findById(user.id);
        if(!userExists)
        {
            throw new Error(UserMessages.ERROR.NOT_FOUND);
        }

        this.users.set(user.id, user);
        return user;
    }

    /** Permite obtener la información de un usuario por medio del ID **/
    async findById(id: string): Promise<UserEntity | null> 
    {
        const user = this.users.get(id);
        return user ?? null;
    }

    /** Permite eliminar la información de un usuario por medio del ID **/
    async delete(id: string): Promise<UserEntity> 
    {
        const userExists = await this.findById(id);
        if(!userExists)
        {
            throw new Error(UserMessages.ERROR.NOT_FOUND);
        }

        this.users.delete(id);
        return userExists;
    }
}