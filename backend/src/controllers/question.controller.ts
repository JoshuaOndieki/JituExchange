import { Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import { IreqInfo } from "../types"

const db = DatabaseHelper.getInstance()

export const postQuestion = async (req:IreqInfo, res:Response) => {
    try {
        const askedBy = req.info?.id as string
        const { summary, details, tags} = req.body
        const questionID = uid()
        
        // post question
        await db.exec('postQuestion', {id:questionID, summary, details, askedBy})

        // add tags
        for (const tag of tags) {
            try {
                let tagID = uid()
                await db.exec('addTag', {name:tag, addedBy:askedBy, id:tagID})
            } catch (error) {}

            // add question tags
            let questionTagID = uid()
            await db.exec('addQuestionTag', {id:questionTagID, tagName:tag, questionID})
        }

        return res.status(201).json({message: "question posted successfully.", id:questionID})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const getQuestions = async (req:IreqInfo, res:Response) => {
    try{
        let page = req.query.page ? +req.query.page : 1 // default to page 1
        let limit = req.query.limit ? +req.query.limit : 20 // default to 20 records
        let sortBy = req.query.sortBy ? req.query.sortBy as string : 'askedDate' // default to sort by askedDate
        let order = req.query.order ? req.query.order : 'DESC' // default to DESC order
        order = order === 'ASC' || order === 'DESC' ? order : 'DESC'
        let askedBy = req.query.askedBy as string || null
        let searchQuery = req.query.searchQuery as string || null

        const questionsCount = await (await db.exec('allQuestionsCount', {})).recordset[0].recordCount

        const metadata = {
            queries: {
                page,
                limit,
                sortBy,
                order,
                askedBy
            },
            recordsInPage: 0,
            recordsInDb: questionsCount,
        }

        if (questionsCount <= (page*limit)-limit) {
            return res.status(404).json({metadata, message: `Page ${page} is not available`})
        }
        let questions = await (await db.exec('getQuestions', {offset:(page*limit)-limit, limit, sortBy, order, askedBy, searchQuery})).recordset

        metadata.recordsInPage = questions.length

        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];
            let qTags = (await db.exec('getQuestionTags', {questionID:question.id})).recordset
            question.tags = qTags.map(tag => tag.tagName)
        }

        if (questions.length) {
            return res.status(200).json({metadata, questions})
        }
        return res.status(404).json({message: 'No questions found'})
    } catch (error:any) {
        // return serverError(error, res)
        return res.status(500).json(error)
    }
}

export const getQuestion = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.id as string
        // get question
        let question = (await db.exec('getQuestion', {id, authID:req.info?.id as string})).recordset[0]
        if (!question) {
            return res.status(404).json({message: `question not found. ID ${id}`})
        }

        // get question tags
        let qTags = (await db.exec('getQuestionTags', {questionID:id})).recordset
        question.tags = qTags.map(tag => tag.tagName)

        // get q comments
        let qComments = (await db.exec('getQuestionComments', {questionID:id})).recordset
        question.comments = qComments
        // get answers
        let qAnswers = (await db.exec('getQuestionAnswers', {questionID:id, voter:req.info?.id || ''})).recordset
        question.answers = qAnswers
        // get comments for every answer
        for (let index = 0; index < qAnswers.length; index++) {
            const answer = qAnswers[index];
            let aComments = (await db.exec('getAnswerComments', {answerID:answer.id})).recordset
            answer.comments = aComments
        }
    
        return res.status(200).json(question)
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const updateQuestion = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.id as string
        const { summary, details, tags} = req.body

        let question = (await db.exec('getQuestion', {id, authID:req.info?.id as string})).recordset[0]
        if (!question) {
            return res.status(404).json({message: `question not found. ID ${id}`})
        }

        if (req.info?.id !== question.askedBy) {
            return res.status(403).json({message: "Forbidden"})
        }
        
        await db.exec('updateQuestion', {id:question.id, summary, details})

        const qTags = (await db.exec('getQuestionTags', {questionID:id})).recordset
        
        // add tags
        for (const tag of qTags) {
            if (tags.includes(tag.tagName)) {
                tags.splice(tags.indexOf(tag.tagName), 1)
            } else {
                await db.exec('removeQuestionTag', {id:tag.id})
            }
        }

        for (const tag of tags) {
            try {                
                let tagID = uid()
                await db.exec('addTag', {name:tag, addedBy:req.info?.id as string, id:tagID})
            } catch (error) {}
            
            // add question tags
            let questionTagID = uid()
            await db.exec('addQuestionTag', {id:questionTagID, tagName:tag, questionID:question.id})
        }

        return res.status(200).json({message: "question updated successfully."})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const deleteQuestion = async (req:IreqInfo, res:Response) => {
    try {
        const id = req.params.id as string

        let question = (await db.exec('getQuestion', {id, authID:req.info?.id as string})).recordset[0]
        if (!question) {
            return res.status(404).json({message: `question not found. ID ${id}`})
        }

        if (req.info?.id !== question.askedBy && req.info?.role !== 'admin') {
            return res.status(403).json({message: "Forbidden"})
        }

        await db.exec('deleteQuestion', {id})

        return res.status(200).json({message: "question deleted."})
    } catch (error:any) {
        return serverError(error, res)
    }
}