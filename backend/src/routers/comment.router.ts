import { Router } from "express";
import { userRequired } from "../middlewares/auth";
import { deleteComment, postComment } from "../controllers/comment.controller";


const commentRouter = Router()

commentRouter.post('', userRequired, postComment)
commentRouter.delete('/:id', userRequired, deleteComment)

export default commentRouter