import express from 'express'
import { generateOtp, verifyOtp } from "../controllers/auth"

const authRouter = express.Router({ mergeParams : true, })

authRouter.get('/otp/generate', generateOtp)
authRouter.post('/otp/verify', verifyOtp)

export default authRouter