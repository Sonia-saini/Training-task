const expres=require("express");
// let data=require("../data.json")
interface CourseOffering {
    course_name: string;
    instructor: string;
    date: Date;
    min_employees: number;
    max_employees: number;
    course_id:string
  }
  const fs=require("fs")
 
  fs.chmod('./data.json', 3000, (err) => {
    if (err) throw err;
    console.log('File permissions changed!');
  });
  let useRouter=expres.Router()
useRouter.post("/add/courseOffering",(req:any,res:any)=>{
const {course_name,instructor,date,min_employees,max_employees}:CourseOffering=req.body;

let data=fs.readFileSync("./data.json","utf-8");


if(course_name&&instructor&&date&&min_employees&&max_employees){
//    let x= data.course.push(req.body);
let parse=JSON.parse(data)
parse.course.push({...req.body,course_id:`OFFERING-${course_name}-${instructor}`})
fs.writeFileSync("./data.json",`${JSON.stringify(parse)}`)

res.status(200).json({status:200,data:{success:{course_id:`OFFERING-${course_name}-${instructor}`}}})
}else{
    res.status(400).json({"status": 400,
    message: "INPUT_DATA_ERROR", 
    data: {
        success: {
            failure:"instructor_name,start_date, min_employees, max_employees cannot be empty"
        }
    }
})
}
})
module.exports=useRouter
  // Define the data model for a response
  
  
