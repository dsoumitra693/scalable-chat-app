import { Router } from "express";
import { deleteUser, login, resgister, updateDetails } from "../controller/auth";

const authRouter = Router();


authRouter.get('/login', login)
authRouter.post('/register', resgister)
authRouter.put('/user/upadate', updateDetails)
authRouter.delete('/user/delete', deleteUser)


export default authRouter