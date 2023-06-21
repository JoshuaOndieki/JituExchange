import { Router } from 'express'
import { deleteUser, getSignedInUser, getUserByEmail, getUserById, getUserByUsername, getUsers, patchUser, signin, signup } from '../controllers/user.controller'
import { validatePatchUserData, validateSigninData, validateSignupData } from '../middlewares/user.validators'
import { userRequired } from '../middlewares/auth'

const userRouter = Router()

userRouter.post('', validateSignupData, signup)
userRouter.post('/signin', validateSigninData, signin)
userRouter.get('/auth', userRequired, getSignedInUser)

userRouter.get('', userRequired, getUsers)
userRouter.get('/id/:id', userRequired, getUserById)
userRouter.get('/u/:username', userRequired, getUserByUsername)
userRouter.get('/u', userRequired, getUserByEmail)

userRouter.patch('', userRequired, validatePatchUserData, patchUser)
userRouter.delete('/delete/:id', userRequired, deleteUser)

export default userRouter