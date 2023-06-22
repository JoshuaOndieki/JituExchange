import { Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import { IreqInfo } from "../types"

const db = DatabaseHelper.getInstance()

export const vote = async (req:IreqInfo, res:Response) => {
    try {
        const {target, voteFor, positive} = req.body
        const voter = req.info?.id as string
        const existingVote = await (await db.exec('getVote', {voter, voteFor, target})).recordset[0]
        const vote_type = positive ? 'upvote' : 'downvote'
        if (existingVote && existingVote.positive === Boolean(positive)) {
            return res.status(409).json({message: `already ${vote_type}d`})
        }
        if (existingVote && existingVote.positive !== Boolean(positive)) {
            await db.exec('removeVote', {id:existingVote.id, target})
        }

        const id = uid()
        await db.exec('vote', {id, target, voter, voteFor, positive})
        return res.status(201).json({message: `${target} ${vote_type}d`})
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const removeVote = async (req:IreqInfo, res:Response) => {

}