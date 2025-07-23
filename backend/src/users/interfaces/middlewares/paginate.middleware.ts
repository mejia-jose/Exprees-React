import { Request, Response,NextFunction } from "express";
import { MapResponse } from "../../../shared/responses/response";
import { UserMessages } from "../../../shared/constants/messages";

export const Pagination = (req: Request, res: Response ,next: NextFunction) =>
{   
    const { page, limit} = req.query;
    const pageNumber = parseInt(page as string, 1);
    const numberElements = parseInt(limit as string, 1000);

    if(pageNumber < 1 || numberElements < 1)
    {
        return res.status(400).json(MapResponse.ResultJson({
           type: false,
           messages: UserMessages.ERROR.ERROR_PAGINATION
        }))
    }
    next();
}