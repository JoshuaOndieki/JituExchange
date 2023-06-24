import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


export const sqlConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    database: process.env.DB_NAME || 'development',
    server: process.env.DB_SERVER as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const namecheapConfig = {
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NAMECHEAP_EMAIL as string,
        pass: process.env.NAMECHEAP_PASSWORD as string
    }
}