import ejs from "ejs"
import NodeMail from "../utils/nodemailer"
import path from 'path'
import { IacceptedAnswerEmailData, IresetEmailData, IwelcomeEmailData } from "../types"

const sendMail = async (data:IwelcomeEmailData | IresetEmailData | IacceptedAnswerEmailData) => {
    try {
        await ejs.renderFile(path.resolve(__dirname, '../../templates/' + data.template +'.template.ejs'), {...data}, async (err, emailHTML)=>{
            if (err) {
                console.error(err)
                return false
            }
            const mailer = NodeMail.getInstance()
            await mailer.send(data.targetEmail, data.subject, emailHTML)
            return true
        })
        return true
    } catch (error) {
        console.error(error)       
        return false
    }
}

export default sendMail