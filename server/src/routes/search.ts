import express from 'express'
import { searchUsers } from "../controllers/search"

const searchRouter = express.Router()

searchRouter.post('/', searchUsers)

export default searchRouter