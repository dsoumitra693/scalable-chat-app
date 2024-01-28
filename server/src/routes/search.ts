import express from 'express'
import { searchUsers } from "../controllers/search"

const searchRouter = express.Router({ mergeParams: true, })

searchRouter.post('/', searchUsers)

export default searchRouter