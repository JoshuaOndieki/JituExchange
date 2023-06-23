import sendMail from "../mailers/mailer"
import { IwelcomeData, Ttable } from "../types"
import DatabaseHelper from "../utils/database"

const watchForWelcomeEmails = async () => {
    const db = DatabaseHelper.getInstance()
    const table:Ttable = 'welcomeEmails'
    const emailLog:IwelcomeData[] = await (await db.exec('getNotSentEmails', {table})).recordset

    if (emailLog.length) {
        console.log('sending ' + emailLog.length + ' welcome emails');
        
        for (let index = 0; index < emailLog.length; index++) {
            const log = emailLog[index];
            const sentStatus = await sendMail({
                type: 'welcomeEmails',
                username: log.username,
                link:'',
                email:log.targetEmail
            })
            
            sentStatus ? await db.exec('markSentEmail', {id:log.id, table}) : ''
        }
    }
}

export default watchForWelcomeEmails