export type Ttable = 'welcomeEmails' | 'passwordResetEmails' | 'acceptedAnswerEmails'

export enum enumEmailTemplate {
    'welcomeEmails' = 'welcome',
    'passwordResetEmails' = 'forgot.password',
    'acceptedAnswerEmails' = 'answer.accepted'
}

export enum enumEmailTemplateSubject {
    'welcomeEmails' = 'Welcome to the JituExchange Community ✨',
    'passwordResetEmails' = 'Confirm password reset - JituExchange',
    'acceptedAnswerEmails' = 'Your answer has been accepted    ✔️    👏'
}

export interface InodemailerMessageOptions {
    from:string
    to:string
    subject?:string
    text?:string
    html?:string
}

export interface ImailData {
    link:string
    template:enumEmailTemplate,
    subject:enumEmailTemplateSubject
}

export interface Idata {
    id: number
    targetUser:string
    targetEmail:string
    sentDate:string
    username:string
}

export interface IwelcomeData extends Idata {}
export interface IwelcomeEmailData extends IwelcomeData, ImailData {}

export interface IacceptedAnswerData extends Idata {
    answerID:string
    questionSummary:string
    questionID:string
    answerSnippet:string
}
export interface IacceptedAnswerEmailData extends IacceptedAnswerData, ImailData {}

export interface IresetData extends Idata {

}
export interface IresetEmailData extends IresetData, ImailData {

}