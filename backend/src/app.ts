import express, {Request, Response, json} from 'express'
import cors from 'cors'
import DatabaseHelper from './utils/database'


const app = express()

app.use(cors())
app.use(json())

app.get('/', (req:Request, res:Response)=> {
    return res.status(200).json({message: 'Jitu Exchange'})
})

const db = DatabaseHelper.getInstance()

app.get('/users', async (req:Request, res:Response)=> {
    const users =  await db.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='JituExchange'`)
    return res.status(200).send(users)
})


export default app