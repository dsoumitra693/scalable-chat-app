import { NextFunction, Request, Response } from "express";
import { asyncErrorHandler } from "../utils/ayncErrorHandler";

export const resgister = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {

    }
)


export const login = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {

    }
)

export const updateDetails = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {

    }
)

export const deleteUser = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {

    }
)