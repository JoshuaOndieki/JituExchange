import { Router } from 'express'
import { getUsers, signup } from '../controllers/user.controller'
import { validateSignupData } from '../middlewares/user.validators'

const userRouter = Router()

userRouter.get('', getUsers)
userRouter.post('', validateSignupData, signup)

export default userRouter