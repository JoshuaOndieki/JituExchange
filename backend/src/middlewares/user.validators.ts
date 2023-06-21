import { NextFunction, Request, Response } from "express";
import signupSchema from "../schemas/signup.schema";
import { serverError } from "../helpers/server.helper";
import signinSchema from "../schemas/signin.schema";
import patchUserSchema from "../schemas/patch.user.schema";


export const validateSignupData = (req:Request, res:Response, next:NextFunction) => {
    try{
        const { error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        next()
    }catch (error:any) {
        return serverError(error, res)
    }
}

export const validateSigninData = (req:Request, res:Response, next:NextFunction) => {
    try{
        const { error } = signinSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        next()
    }catch (error:any) {
        return serverError(error, res)
    }
}

export const validatePatchUserData = (req:Request, res:Response, next:NextFunction) => {
    try{
        const { error } = patchUserSchema.validate(req.body)
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }
        next()
    }catch (error:any) {
        return serverError(error, res)
    }
}