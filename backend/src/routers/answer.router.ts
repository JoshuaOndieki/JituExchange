import { Router } from "express";
import { userRequired } from "../middlewares/auth";
import { deleteAnswer, postAnswer, updateAnswer } from "../controllers/answer.controller";


const answerRouter = Router()

answerRouter.post('/:questionID', userRequired, postAnswer)
answerRouter.put('/:id', userRequired, updateAnswer)
answerRouter.delete('/:questionID', userRequired, deleteAnswer)
// answerRouter.get('', userRequired)

export default answerRouter