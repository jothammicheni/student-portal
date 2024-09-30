import express from "express";
import mongoose from "mongoose";
import cors from "cors";
 import {PORT, CONNECTION_URL} from "./config.js";
 import studentRoute from "./routes/studentRoute.js";
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    method:['PUT','DELETE','PUT','POST'],
    allowedHeaders:['Content-Type']
}));


//use the student router
app.use('/student',studentRoute)



app.get('/',(req,res)=>{
  return  res.status(200).send("hello");
})






//connect to the database

mongoose
.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true})
.then( () => {
    console.log("Databse Connected successfully");
    app.listen(PORT, ()=>{
        console.log(`server running at http://localhost:${PORT}`);
    });

}).catch((err)=>{
    console.error('Database Connection Error', err.message)
})