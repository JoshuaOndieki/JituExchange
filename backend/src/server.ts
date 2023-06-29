import app from "./app";
import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path:path.resolve(__dirname, '../.env')})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || ''

app.listen(+PORT, HOST, ()=>{
    console.log(` ✔️  Jitu Exchange API running... ${HOST}:${PORT} 🚀`);
})