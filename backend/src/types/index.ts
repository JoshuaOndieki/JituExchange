import { Request } from "express"

export interface Ipayload {
    id:string,
    role: 'user' | 'admin'
}

export interface IreqInfo extends Request {
    info?: Ipayload
}

export type TuserFilterType = 'id' | 'email' | 'username'

export interface Iuser {
    firstname:string | null
    lastname:string | null
    id:string
    email:string
    username:string
    location:string | null
    joinedDate:string
    website: string | null
    github:string | null
    avatar:string | null
    role: 'admin' | 'user'
    password:string
    isDeleted:Boolean
}

export interface Imetadata {
    queries: {
        page: number
        limit: number
        sortBy: string
        order: string
        askedBy?: string | null
        searchQuery?: string | null
    }
    recordsInPage: number
    recordsInDb: number
}