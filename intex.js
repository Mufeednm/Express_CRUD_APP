
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
    res.status(200).json({ message: "Post request received", id });
})
app.put("/user/:id",(req,res)=>{
    const id = req.params.id
    const finduser = data.findIndex(value => value.id==id)
    const updateuser=data[finduser]


    const {name,email,username}  = req.body;


    if(name)updateuser.name=name
    if(email)updateuser.email=email
    if(username)updateuser.username=username
    fs.writeFile("./db/datastore.json",JSON.stringify(data),(error)=>{
        if (error) {
            console.log("its error final data",error);
            
        }
    })
    res.status(200).json({ message: "PUT request received", id });
    // console.log(finduser);
    
})
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const locater = data.findIndex(value => value.id == id);

    if (locater !== -1) {
        data.splice(locater, 1);
        fs.writeFile("./db/datastore.json", JSON.stringify(data), (error) => {
            if (error) {
                console.log("Error writing final data", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Delete request received", id });
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(PORT,()=>{
    console.log(`server running in ${PORT}`);
})