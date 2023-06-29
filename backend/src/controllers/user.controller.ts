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
        let page = req.query.page ? +req.query.page : 1 // default to page 1
        let limit = req.query.limit ? +req.query.limit : 20 // default to 20 records
        let sortBy = req.query.sortBy ? req.query.sortBy as string : 'joinedDate' // default to sort by joinedDate
        let order = req.query.order ? req.query.order : 'ASC' // default to ASC order
        order = order === 'ASC' || order === 'DESC' ? order : 'ASC'

        const usersCount = await (await db.exec('allUsersCount', {})).recordset[0].recordCount

        const metadata = {
            queries: {
                page,
                limit,
                sortBy,
                order,
            },
            recordsInPage: 0,
            recordsInDb: usersCount,
        }

        if (usersCount <= (page*limit)-limit) {
            return res.status(404).json({metadata, message: `Page ${page} is not available`})
        }
        let users = await (await db.exec('getUsers', {offset:(page*limit)-limit, limit, sortBy, order})).recordset
        users.forEach(user => {
            delete user.isDeleted
            delete user.password
        });

        metadata.recordsInPage = users.length

        if (users.length) {
            return res.status(200).json({metadata, users})
        }
        return res.status(404).json({message: 'No users found'})
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

        const userByEmail = (await db.exec('getUserBy', {filter_type:'email', filter_value:email, deleted:true})).recordset[0]
        const userByUsername = userByEmail?.username === username ? userByEmail : (await db.exec('getUserBy', {filter_type:'username', filter_value:username, deleted:true})).recordset[0]

        const softDeletedUser = userByEmail?.isDeleted || userByUsername?.isDeleted

        if ((userByEmail || userByUsername) && !softDeletedUser) {
            return res.status(409).json({message: 'user already exists'})
        }

        if (softDeletedUser) {
            // if soft deleted user, delete before creating a new user record for them
            await db.exec('deleteUser', {id:userByEmail?.id || ''})
        }        

        await db.exec('addUser', {id, username, email, password})

        return res.status(201).json({message: "sign up successful."})
    } catch (error:any) {
        return serverError(error, res)
    }
}

async function getUserBy(type:TuserFilterType, value:string, res:Response) {
    let user = await getUser(type, value as string)

    if(user){
        return res.status(200).json(user)
    }
    return res.status(404).json({message:`User ${value} does not exist`})
}

export const getUserById = (req:IreqInfo, res:Response) => {
    try {
        const { id } =  req.params
        return getUserBy('id', id as string, res)
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const getUserByUsername = (req:IreqInfo, res:Response) => {
    try {
        const { username } =  req.params
        return getUserBy('username', username as string, res)
    } catch (error:any) {
        return serverError(error, res)
    }
}

export const getUserByEmail = async (req:IreqInfo, res:Response) => {
    try {
        const { email } = req.query
        if (!email) {
            return res.status(400).json({message: `Missing email query parameter`})
        }
        return getUserBy('email', email as string, res)
    } catch (error:any) {
        return serverError(error, res)
    }
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

export const patchUser = async (req:IreqInfo, res:Response) => {
    try {
        const filter_type:TuserFilterType = "id"
        const id = req.info?.id as string

        let user = await getUser(filter_type, id)

        if(!user){
            return res.status(404).json({message:`Failed to update. User Not Found. ID: ${id}`})
        }

        const { firstname, lastname, location, website, github, avatar } = req.body

        const providedValues = {
            ...(firstname !== undefined && { firstname }),
            ...(lastname !== undefined && { lastname }),
            ...(location !== undefined && { location }),
            ...(website !== undefined && { website }),
            ...(github !== undefined && { github }),
            ...(avatar !== undefined && { avatar })
        }
        
        if (!Object.keys(providedValues).length) {
              return res.status(400).json({message: "No data provided to update", details: "provide any or all of the following: [firstname, lastname, location, website, github, avatar]"})
        }        
        
        await db.exec('patchUser', {id, ...providedValues})
        return res.status(200).json({message: "User updated successfully."})

    } catch (error:any) {
         return serverError(error, res)
    }
}

export const deleteUser = async (req:IreqInfo, res:Response) => {
    const requesterID = req.info?.id as string
    const id = req.params.id as string

    let user = await getUser('id', id)

    if (req.info?.role !== 'admin' && user?.id !== requesterID) {
        return res.status(403).json({message: 'Unauthorized'})
    }

    if(!user){
        return res.status(404).json({message:`Failed to delete. User Not Found. ID: ${id}`})
    }

    await db.exec('softDeleteUser', {id})

    return res.status(200).json({message:'User deleted.'})
}