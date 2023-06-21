import { NextFunction, Request, Response } from "express"
import newQuestionSchema from "../schemas/new.question.schema"
import { serverError } from "../helpers/server.helper"

export const validateNewQuestionData = (req:Request, res:Response, next:NextFunction) => {
    try{
        const { error } = newQuestionSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        next()
    }catch (error:any) {
        return serverError(error, res)
    }
}