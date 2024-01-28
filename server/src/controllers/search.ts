import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/ayncErrorHandler";
import { appwriteUsers } from "../services/appwriteService";
import { Query } from "node-appwrite";

export const searchUsers = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let searchQuery = req.body.users
        let _usersResponse = await appwriteUsers.list([], Query.equal(
            'phone', searchQuery
        ))

        
        let users = _usersResponse.users.map(u => ({
            id: u.$id,
            name: u.name,
            phone: u.phone
        }))


        return res.status(200).send({ users })
    }
)