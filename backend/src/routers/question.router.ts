import { Router } from "express";
import { userRequired } from "../middlewares/auth";
import { deleteQuestion, getQuestion, getQuestions, postQuestion, updateQuestion } from "../controllers/question.controller";
import { validateNewQuestionData } from "../middlewares/question.validators";


const questionRouter = Router()

questionRouter.post('', userRequired, validateNewQuestionData, postQuestion)
questionRouter.get('', userRequired, getQuestions)
questionRouter.get('/q/:id', userRequired, getQuestion)
questionRouter.put('/q/:id', userRequired, validateNewQuestionData, updateQuestion)
questionRouter.delete('/q/:id', userRequired, deleteQuestion)

export default questionRouter