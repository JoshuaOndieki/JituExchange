import { Request, Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import bcrypt from 'bcrypt'

const db = DatabaseHelper.getInstance()

export const getUsers = async (req:Request, res:Response) => {
    try {
        // let users = await db.exec('')
        return res.status(200).json([])
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const signup = async (req:Request, res:Response) => {
    try {
        const id = uid()
        let { username, email, password } = req.body
        password = bcrypt.hashSync(req.body.password, 10)
        username = username.toLowerCase()
        email =  email.toLowerCase()

        await db.exec('addUser', {id, username, email, password})

        return res.status(201).json({message: "sign up successful."})
    } catch (error:any) {
        return serverError(error, res)
    }
}