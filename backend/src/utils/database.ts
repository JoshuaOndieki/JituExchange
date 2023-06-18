import mssql from 'mssql';
import { sqlConfig } from '../config';


 export default class DatabaseHelper{
    // Singleton

    private static instance: DatabaseHelper;
    private pool: Promise<mssql.ConnectionPool>
  
    private constructor() {
        this.pool = mssql.connect(sqlConfig)
    }
  
    public static getInstance(): DatabaseHelper {
      if (!DatabaseHelper.instance) {
        DatabaseHelper.instance = new DatabaseHelper();
      }
      return DatabaseHelper.instance;
    }
    
    private static addInputsToRequest(request:mssql.Request, data:{[x:string]:string|number|null}={}){
        const keys = Object.keys(data)
        keys.map(keyName=>{
            return request.input(keyName, data[keyName])
        })
        return request
    }
    
    async exec (storedProcedure:string, data:{[x:string]:string|number|null}={}){
        let  request: mssql.Request = await (await this.pool).request()
        request = DatabaseHelper.addInputsToRequest(request, data)
        return await request.execute(storedProcedure)
    }

    async query(queryString:string){
        return (await this.pool).request().query(queryString)   
    }
}