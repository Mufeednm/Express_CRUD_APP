
import express from "express"
import { config } from "dotenv";
import data from "./db/datastore.json" assert { type: 'json' }
import { type } from "os";
import crypto from "crypto"
import fs from "fs"
config()

const app = express();

app.use(express.json())

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
res.status(200).json(data)
})
app.post("/user",(req,res)=>{

    const {name ,email,username}  =  req.body;
    const id = crypto.randomUUID()
    
    data.push({id,name,email,username})
    fs.writeFile("./db/datastore.json",JSON.stringify(data),(error)=>{
        if (error) {
            console.log("its error final data",error);
            
        }
    })
res.send("hellsado")
})

app.listen(PORT,()=>{
    console.log(`server running in ${PORT}`);
})