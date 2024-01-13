import { Client, Account, ID } from "appwrite";
import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv'

dotenv.config()

const ENDPOINT = process.env.APPWRITE_ENDPOINT as string
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID as string

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const account = new Account(client);


export const generateOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phone = req.query.phone as string

        console.log(req.query)
        const sessionToken = await account.createPhoneSession(ID.unique(), '+'+phone);
        const userId = sessionToken.userId;

        res.status(201).send({ userId })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const otp = req.body.userId
    console.log(req.body.userId)
    const session = await account.updatePhoneSession(userId, otp);
    res.status(201).send({ session })
}