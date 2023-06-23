export type Ttable = 'welcomeEmails' | 'passwordResetEmails' | 'acceptedAnswerEmails'

export interface InodemailerMessageOptions {
    from:string
    to:string
    subject?:string
    text?:string
    html?:string
}

export interface ImailData {
    username:string
    link:string
    email:string
    type:Ttable
}

export interface IwelcomeData {
    id: number
    targetUser:string
    targetEmail:string
    sentDate:string
    username:string
}