import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../application/use_cases/create-user.usecase";
import { ListUserUseCase } from "../../application/use_cases/list-user-usercase";
import { UpdateUserUseCase } from "../../application/use_cases/update-user.usecase";
import { UserMessages } from "../../../shared/constants/messages";
import { MapResponse } from "../../../shared/responses/response";

export class UserController
{
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private listUserUseCase : ListUserUseCase,
        private updateUserUseCase : UpdateUserUseCase
    )
    {}

    /**Permite delegar al caso de uso de listar usuarios y retornar la respuesta obtenida**/
    async listUser(req: Request, res:Response, next: NextFunction)
    {
       try
       {
          const { page, limit} = req.query;
          const pageNumber = parseInt(page as string) || 1;
          const pageElements = parseInt(limit as string) || 10;
          const result = await this.listUserUseCase.getUsers(pageNumber,pageElements);

          if(!result)
          {
            res.status(200).json(MapResponse.ResultJson({
                type: false,
                messages: UserMessages.SUCCESS.NO_INFORMATION
            }));
          }

          res.status(200).json(MapResponse.ResultJson({
            type: true,
            messages: UserMessages.SUCCESS.USERS_FOUND,
            data: result
          }));

       }catch(error: any)
       {
          next(error);
       }
    }

    /** Permite delegar al caso de uso de crear usuarios y retornar la respuesta **/
    async create(req: Request, res:Response, next: NextFunction)
    {
        try
        {
            const result = await this.createUserUseCase.execute(req.body);

            res.status(201).json(MapResponse.ResultJson({
                type: true,
                messages: UserMessages.SUCCESS.USER_CREATE,
                data: result
            }));

        }catch(error: unknown)
        {
            next(error);
        }
    }

    /** Permite delegar al caso de uso de actualizar la información de usuarios y retornar la respuesta **/
    async update(req: Request, res:Response, next: NextFunction)
    {
        try
        {
            const result = await this.updateUserUseCase.execute(req.body);

            res.status(200).json(MapResponse.ResultJson({
                type: true,
                messages: UserMessages.SUCCESS.USER_UPDATE,
                data: result
            }));

        }catch(error: unknown)
        {
            next(error);
        }
    }
}