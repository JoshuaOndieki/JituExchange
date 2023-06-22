import { Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import { IreqInfo } from "../types"

const db = DatabaseHelper.getInstance()

export const postComment = async (req:IreqInfo, res:Response) => {
    try {
        const id = uid()
        const {details, commentFor, target} = req.body
        if ((!details || !commentFor || !target) || (target !== 'question' && target !== 'answer')) {
            return res.status(400).json({message: "details, commentFor, and target (question or answer) are all required in the body"})
        }
        await db.exec('postComment', {id, details, commentFor, target, commentBy:req.info?.id as string})
        return res.status(201).json({message: "comment posted successfully."})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const deleteComment = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.id as string
        const comment = await (await db.exec('getComment', {id})).recordset[0]
        if (!comment) {
            return res.status(404).json({message: "unable to delete. comment does not exist."})
        }
        if (comment.commentBy !== req.info?.id && req.info?.role !== 'admin') {
            return res.status(403).json({message: "Forbidden"})
        }
        await db.exec('deleteComment', {id})
    } catch (error:any) {
        return serverError(error, res)
    }
}