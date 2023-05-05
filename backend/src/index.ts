const coursereg=require("../src/routes/courseRegister");
const connectioned=require("./config/db");
const express=require("express");
const CoursecancelRoute=require("./routes/CancelCourse");
const fs = require("fs");
const coursealot=require("./routes/Courseallotment")
fs.chmod("data.json", 3000, (err) => {
  if (err) throw err;
  console.log("File permissions changed!");
});
let cors=require("cors");
let useRoute=require("./routes/courseRoute")
let app=express()
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome home")
})
app.use("/",useRoute)
app.use("/",coursereg)
app.use("/",coursealot)
app.use("/",CoursecancelRoute)
app.listen(3000,async()=>{
  try {
    await connectioned;
    console.log("db is connected");
  } catch (err) {
    console.log("db connection have error");
  }
    console.log("server is running on port 3000")
})