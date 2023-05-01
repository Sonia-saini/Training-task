console.log("hello world")
const express=require("express");
let cors=require("cors");
let useRoute=require("./routes/courseRoute")
let app=express()
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome home")
})
app.use("/",useRoute)
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})