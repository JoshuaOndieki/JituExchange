
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

export interface InewQuestionData {
    summary: string
    details: string
    tags: string[]
}

export interface InewAnswerData {
    details: string
    questionID:string
}

export interface InewCommentData {
    details:string
    commentFor:string
    target: 'question' | 'answer'
}

export interface InewVoteData {
    target: string
    voteFor: string
    positive: boolean
}

export interface Iquestion {
    id: string
    summary: string
    details: string
    askedBy: string
    askedDate: string
    editedDate: string | null
    views: number
    username: string
    upvotes: number
    downvotes: number
    answersCount: number
    tags: string[]
  }

export interface IquestionWithDetails {
    id: string
    summary: string
    details: string
    askedBy: string
    askedDate: string
    editedDate: string | null
    views: number
    username: string
    upvotes: number
    downvotes: number
    userVote: null | boolean
    answersCount: number
    tags: string[]
    comments: Icomment[]
    answers: Ianswer[]
}

export interface Icomment {
    id: string
    commentFor: string
    details: string
    commentBy: string
    editedDate: string | null
    commentedDate: string
    username: string
}

export interface Ianswer {
    id: string
    details: string
    answeredDate: string
    editedDate: string | null
    answeredBy: string
    answerFor: string
    accepted: boolean
    username: string
    upvotes: number
    downvotes: number
    userVote: null | boolean
    comments: Icomment[]
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
    questions: IquestionState
}

export interface IuserState {
    authUser: Iuser | null
    errors: IuserStateErrors
    asyncInitialized:boolean
    users: Iusers | null
    userProfile: IuserProfile
}

export interface IuserProfile {
    info: Iuser | null
    questions: Iquestion[]
    answers: Ianswer[]
    comments: Icomment[]
}

export interface IuserStateErrors {
    authUser:string | null
    signin: string | null
    signup:string | null
    users: string | null
    signout: string | null
    userProfile: string | null
}

export interface IquestionState {
    question: IquestionWithDetails | null
    topQuestions: Iquestion[]
    errors: IquestionStateErrors
}

export interface IquestionStateErrors {
    question: string | null
    topQuestions: string | null
    postAnswer: string | null
    askQuestion: string | null
    addComment: string | null
    voting: string | null
}

export interface Imetadata {
    queries: Iqueries
    recordsInPage: number
    recordsInDb: number
}
  
export interface Iqueries {
    page?: number
    limit?: number
    sortBy?: string
    order?: string
    askedBy?:string
    [key: string]: string | number | undefined
  }

export interface Iquestions {
    metadata: Imetadata
    questions: Iquestion[]
}

export interface Iusers {
    metadata: Imetadata
    users: Iuser[]
}


export enum getUserUrlPath {
    'id' = 'users/id/',
    'email' = 'users/u/',
    'username' = 'users/u/'
}