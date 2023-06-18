import { Response } from "express"


export const serverError = (error:any, res:Response) => {
    return res.status(500).json({message: error.message})
}