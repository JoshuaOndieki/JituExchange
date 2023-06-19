import { Request, Response } from "express"
import { serverError } from "../helpers/server.helper"
import DatabaseHelper from "../utils/database"
import { v4 as uid } from 'uuid'
import bcrypt from 'bcrypt'
import { IreqInfo, TuserFilterType, Iuser } from "../types"
import jwt from 'jsonwebtoken'

const db = DatabaseHelper.getInstance()

export const getUsers = async (req:IreqInfo, res:Response) => {
    try {
        // let users = await db.exec('')
        return res.status(200).json([])
    } catch (error:any) {
        return serverError(error, res)
    }
}

function filterSensitiveUserInfo(users:Iuser[]) {
    users.map((user:Partial<Iuser>)=>{
        delete user.password
        delete user.isDeleted
    })
}

async function getUser(filter_type:TuserFilterType, filter_value:string) {
    let user:Iuser =(await db.exec('getUserBy', {filter_type,filter_value})).recordset[0]
    if(user){
        filterSensitiveUserInfo([user])
        return user
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

export const getUserById = (req:IreqInfo, res:Response) => {
    const { id } = req.params
}

export const getUserByUsername = (req:IreqInfo, res:Response) => {
    const {username} =  req.params
}

export const getUserByEmail = (req:IreqInfo, res:Response) => {
    const { email } = req.query
}

export const signin= async (req:Request, res:Response)=>{
    try {

        const{identifier, password}= req.body

        const filter_type = identifier.includes('@') ? 'email' : 'username'
        
        let user:Iuser =(await db.exec('getUserBy', {filter_type, filter_value:identifier})).recordset[0]
        
        if(!user){ return res.status(404).json({message:"User not Found"}) }

        let validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){ return res.status(401).json({message:`Incorrect credentials for <${identifier}>`}) }
    
        const payload= {'id': user.id, 'role':user.role}
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, {expiresIn:"43200s"}) 
        res.status(200).json({message:'Signin successful', token})

    }
    catch (error:any) { return serverError(error, res) }
}

export const getSignedInUser = async (req:IreqInfo, res:Response) => {
    try {
        const filter_type:TuserFilterType = "id"
        const id = req.info?.id as string

        let user = await getUser(filter_type, id)

        if(user){
            return res.status(200).json(user)
        }
        return res.status(404).json({message:`User Not Found`})
    } catch (error:any) {
         return serverError(error, res)
    }
}