import express from 'express'
import { searchUsers } from "../controllers/search"

const searchRouter = express.Router({ mergeParams: true, })

searchRouter.get('/', searchUsers)

export default searchRouter