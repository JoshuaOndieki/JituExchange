import { Router } from 'express'
import { getUserByEmail, getUserById, getUserByUsername, getUsers, signin, signup } from '../controllers/user.controller'
import { validateSigninData, validateSignupData } from '../middlewares/user.validators'
import { userRequired } from '../middlewares/auth'

const userRouter = Router()

userRouter.get('', getUsers)
userRouter.post('', validateSignupData, signup)
userRouter.get('/id/:id', userRequired, getUserById)
userRouter.get('/u/:username', userRequired, getUserByUsername)
userRouter.get('/u', userRequired, getUserByEmail)
userRouter.post('/signin', validateSigninData, signin)

export default userRouter