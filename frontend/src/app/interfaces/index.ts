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
    askedDate:string
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