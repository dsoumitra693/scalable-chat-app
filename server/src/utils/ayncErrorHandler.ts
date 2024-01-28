import { Request, Response, NextFunction } from "express"
import createHttpError from 'http-errors';

export const asyncErrorHandler = (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(error => {
            let statusCode = 400
            let message =
                error instanceof Error ? error.message : "Server error"

            return next(createHttpError(statusCode, message))
        })
    }
}
