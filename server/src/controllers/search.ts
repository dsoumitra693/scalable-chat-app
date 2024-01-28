import { NextFunction, Request, Response, query } from "express";
import { asyncErrorHandler } from "../utils/ayncErrorHandler";
import { appwriteUsers } from "../services/appwriteService";
import { Query } from "node-appwrite";

export const searchUsers = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let phoneNums = req.body.users

        const max_nums = 14
        let numOfArr = Math.ceil(phoneNums?.length / max_nums)
        let numArr = new Array(numOfArr).fill([])

        let queryArr = numArr.map((arr, idx) => {
            let _nums = phoneNums.slice(idx * max_nums, (idx + 1) * max_nums)
            let query = Query.equal(
                'phone', _nums
            )
            return query
        })
        const responses = await Promise.all(queryArr.map(async (query) => {
            return await appwriteUsers.list([], query);
        }));



        let validResponses = responses?.filter(res => res.total > 0);
        let users = validResponses.flatMap(res =>
            res?.users.map(u => ({
                id: u.$id,
                name: u.name,
                phone: u.phone
            })) ?? []
        )
        return res.status(200).send({ users })
    }
)