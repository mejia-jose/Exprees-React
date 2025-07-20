import { UserEntity } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user.repository.interface";
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
        this.users.set(user.id, user);
        if(!this.users.has(user.id))
        {
            throw new Error(UserMessages.ERROR.ERROR_CREATE);
        }

        return user;
    }

    /** Permite actualizar la información de un usuario **/
    async update(user: UserEntity): Promise<UserEntity> 
    {
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

    /**Permite buscar un usuario por medio del username **/
    async findUserByUserName(username:string):Promise<boolean>
    {
        for(const user of this.users.values())
        {
            if(user.username === username)
            {
                return true;
            }
        }
        return false;
    }
}