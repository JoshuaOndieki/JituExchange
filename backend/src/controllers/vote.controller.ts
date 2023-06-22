import { Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import { IreqInfo } from "../types"

const db = DatabaseHelper.getInstance()

export const vote = async (req:IreqInfo, res:Response) => {
    const {target, voter, voteFor, positive} = req.body
    const existingVote = await (await db.exec('getVote', {voter, voteFor, target})).recordset[0]
    if (existingVote && existingVote.positive === Boolean(positive)) {
        return res.status(200).json({message: ""})
    }
    const id = uid()
}

export const removeVote = async (req:IreqInfo, res:Response) => {

}