import { Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import { IreqInfo } from "../types"

const db = DatabaseHelper.getInstance()

export const postAnswer = async (req:IreqInfo, res:Response) => {
    try {
        const questionID = req.params.questionID as string
        const {details} = req.body
        if (!details) {
            return res.status(400).json({message: "details missing in body"})
        }
        let question = (await db.exec('getQuestion', {id:questionID, authID: req.info?.id as string})).recordset[0]
        if (!question) {
            return res.status(404).json({message: `question not found. ID ${questionID}`})
        }

        const id = uid()
        const answeredBy = req.info?.id as string
        
        await db.exec('postAnswer', {id, details, answeredBy, answerFor:questionID})
        return res.status(201).json({message: "answer posted successfully."})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const updateAnswer = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.questionID as string
        let answer = (await db.exec('getAnswer', {id})).recordset[0]
        if (!answer) {
            return res.status(404).json({message: `answer not found. ID ${id}`})
        }

        const {details} = req.body
        if (details) {
            await db.exec('updateAnswer', {id, details})
        }
        return res.status(400).json({message: "details missing in body"})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const deleteAnswer = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.questionID as string
        let answer = (await db.exec('getAnswer', {id})).recordset[0]
        if (!answer) {
            return res.status(404).json({message: `answer not found. ID ${id}`})
        }
        if (answer.answeredBy !== req.info?.id && req.info?.role !== 'admin') {
            return res.status(403).json({message: "Forbidden"})
        }
        await db.exec('deleteAnswer', {id})
        return res.status(200).json({message:"answer deleted."})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const acceptAnswer = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.id as string
        let answer = (await db.exec('getAnswer', {id})).recordset[0]
        if (!answer) {
            return res.status(404).json({message: `answer not found. ID ${id}`})
        }
        const question = await (await db.exec('getQuestion', {id:answer.answerFor, authID: req.info?.id as string})).recordset[0]
        if (req.info?.id !== question.askedBy) {
            return res.status(403).json({message: "Forbidden"})
        }
        console.log({id, questionID:question.id});

        await db.exec('resetAcceptedAnswer', {questionID:question.id})
        await db.exec('acceptAnswer', {id, questionID:question.id})
        
        return res.status(200).json({message: "Answer accepted"})
    } catch (error:any) {
        return serverError(error, res)
    }
}