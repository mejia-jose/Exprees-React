import { UserEntity } from "../entities/user.entity";

/** Se define el contrato del repositorio de User **/
export interface IUserRepository
{
    save(user:UserEntity):Promise<UserEntity>;
    update(user:UserEntity): Promise<UserEntity>;
    delete(id:string):Promise<UserEntity>;
    findById(id:string):Promise<UserEntity | null>;
    listAll(pageNumber:number,pageElements:number):Promise<UserEntity[]>;
    countAll(): Promise<number>;
}