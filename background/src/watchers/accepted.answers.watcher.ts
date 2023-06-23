import sendMail from "../mailers/mailer"
import { IacceptedAnswerData, IacceptedAnswerEmailData, Ttable, enumEmailTemplate, enumEmailTemplateSubject } from "../types"
import DatabaseHelper from "../utils/database"
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const watchAcceptedAnswers = async () => {
    const db = DatabaseHelper.getInstance()
    const table:Ttable = 'acceptedAnswerEmails'
    const emailLog:IacceptedAnswerData[] = await (await db.exec('getNotSentEmails', {table})).recordset

    if (emailLog.length) {
        console.log('sending ' + emailLog.length + ' accepted answer emails');
        
        for (let index = 0; index < emailLog.length; index++) {
            const log = emailLog[index];
            const data:IacceptedAnswerEmailData = {
                template: enumEmailTemplate.acceptedAnswerEmails,
                subject: enumEmailTemplateSubject.acceptedAnswerEmails,
                link:process+log.questionID,
                ...log
            }
            const sentStatus = await sendMail(data)
            
            sentStatus ? await db.exec('markSentEmail', {id:log.id, table}) : ''
        }
    }
}

export default watchAcceptedAnswers