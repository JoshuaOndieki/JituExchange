export interface Iuser {
    firstname:string
    lastname:string
    id:string
    email:string
    username:string
    location:string | null
    joinedDate:string
    website: string | null
    github:string
    avatar:string
    role: 'admin' | 'user'
}

export interface InewUserData {
    email:string
    username:string
    password:string
} 

export interface Iquestion {
    id:string
    summary:string
    details:string
    askedDate:string
    editedDate: string | null
    askedBy:string
}

export interface Ianswer {
    id:string
    details:string
    answeredDate:string
    editedDate:string | null
    answeredBy:string
    answerFor:string
}

export interface Icomment {
    id:string
    details:string
    commentedDate:string
    editedDate: string | null
    commentBy:string
    commentFor:string
}

export interface Itag {
    id:string
    name:string
    description:string
    addedDate:string
}

export interface IpasswordStrengthErrors {
    upperCase?:string
    lowerCase?:string
    numeric?:string
    special?:string
    minLength?: {
        received:number
        expected:number
    }
}

export interface ItoastMessage {
    message:string
    type: 'success' | 'error' | 'info'
    displayed:Boolean
}

export interface Istate {
    users: IuserState
}

export interface IuserState {
    authUser: Iuser | null
    errors: IuserStateErrors
    asyncInitialized:boolean
}

export interface IuserStateErrors {
    authUser:string | null
    signin: string | null
    signup:string | null
    users: string | null
    signout: string | null
}