import sendMail from "../mailers/mailer"
import { IwelcomeData, IwelcomeEmailData, Ttable, enumEmailTemplate, enumEmailTemplateSubject } from "../types"
import DatabaseHelper from "../utils/database"

const watchForWelcomeEmails = async () => {
    const db = DatabaseHelper.getInstance()
    const table:Ttable = 'welcomeEmails'
    const emailLog:IwelcomeData[] = await (await db.exec('getNotSentEmails', {table})).recordset

    if (emailLog.length) {
        console.log('sending ' + emailLog.length + ' welcome emails');
        
        for (let index = 0; index < emailLog.length; index++) {
            const log = emailLog[index];
            const data:IwelcomeEmailData = {
                template: enumEmailTemplate.welcomeEmails,
                subject: enumEmailTemplateSubject.welcomeEmails,
                link:'',
                ...log
            }
            const sentStatus = await sendMail(data)
            
            sentStatus ? await db.exec('markSentEmail', {id:log.id, table}) : ''
        }
    }
}

export default watchForWelcomeEmails