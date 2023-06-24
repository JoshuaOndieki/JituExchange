import nodemailer from 'nodemailer'
import { namecheapConfig } from '../config';
import { InodemailerMessageOptions } from '../types';


export default class NodeMail {
    // Singleton
    private static instance: NodeMail;
    
    private constructor() {
    }
    
    public static getInstance(): NodeMail {
        if (!NodeMail.instance) {
            NodeMail.instance = new NodeMail();
        }
        return NodeMail.instance
    }

    private static setMessageOptions(recipient:string, emailSubject:string, html:string) {
        const messageOptions:InodemailerMessageOptions = {
            from: process.env.NAMECHEAP_EMAIL as string,
            to: recipient,
            subject: emailSubject,
            html: html
        }

        return messageOptions
    }

    async send(recipient:string, emailSubject:string, html:string) {
        const transporter = nodemailer.createTransport(namecheapConfig)
        const messageOptions:InodemailerMessageOptions = NodeMail.setMessageOptions(recipient, emailSubject, html)

        const info = await transporter.sendMail(messageOptions)

        return info
    }
}