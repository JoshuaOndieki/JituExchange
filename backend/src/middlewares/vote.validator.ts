import { NextFunction, Request, Response } from "express"
import { serverError } from "../helpers/server.helper"
import voteSchema from "../schemas/vote.schema"

export const validateVoteData = (req:Request, res:Response, next:NextFunction) => {
    try{
        const { error } = voteSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        next()
    }catch (error:any) {
        return serverError(error, res)
    }
}