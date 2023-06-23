import ejs from "ejs"
import NodeMail from "../utils/nodemailer"
import path from 'path'
import { ImailData } from "../types"

const sendMail = async (data:ImailData) => {
    try {
        let templateName = data.type === 'welcomeEmails' ? 'welcome' : ''
        let subject = data.type === 'welcomeEmails' ? 'Welcome to the JituExchange Community ✨' : ''
        
        await ejs.renderFile(path.resolve(__dirname, '../../templates/' + templateName +'.template.ejs'), {...data}, async (err, emailHTML)=>{
            if (err) {
                console.error(err)
                return false
            }
            const mailer = NodeMail.getInstance()
            await mailer.send(data.email, subject, emailHTML)
            return true
        })
        return true
    } catch (error) {        
        return false
    }
}

export default sendMail