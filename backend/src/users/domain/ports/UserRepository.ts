import { UserEntity } from "../entities/UserEntity";

/** Se define el contrato del repositorio de User **/
export interface UserRepository
{
    save(user:UserEntity):Promise<void>,
    update(user:UserEntity): Promise<void>,
    delete(id:string):Promise<void>,
    findById(id:string):Promise<UserEntity | null>,
    listAll(pageNume:number,pageElements:number):Promise<UserEntity[]>
}