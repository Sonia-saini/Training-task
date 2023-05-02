
const fs2=require("fs");
const allot=require("express");
const CourseAllotment=allot.Router();
CourseAllotment.post("/allot/:course_id",(req:any,res:any)=>{
    const courseiid=req.params.course_id
    let data = fs2.readFileSync("./data.json", "utf-8");
    let parse = JSON.parse(data);
  
    let total_registered: number;
    let max_employees: number;
    let min_employees: number;
  
    let start_date: string;
  
    let start_day: number;
    let start_month: number;
    let start_year: number;
   
    const date = new Date();
    const current_day = date.getDate();
    const current_month = date.getMonth() + 1;
    const current_year = date.getFullYear();
  
    if(courseiid){
       total_registered = parse.course_registration.filter(
           (el) => el.course_id === courseiid
         ).length;
         max_employees = parse.course.filter((el) => el.course_id === courseiid)[0]
           .max_employees;
         min_employees = parse.course.filter((el) => el.course_id === courseiid)[0]
           .min_employees;
         console.log(total_registered);
         start_date = parse.course.filter((el) => el.course_id === courseiid)[0]
           .start_date;
         start_day = Number(start_date[0] + start_date[1]);
         start_month = Number(start_date[2] + start_date[3]);
         start_year = Number(
           start_date[4] + start_date[5] + start_date[6] + start_date[7]
         );
     }
    if (
        current_year > start_year ||
        current_month > start_month ||
        current_day >= start_day
      ) {
        if (min_employees > total_registered) {
          res.status(400).send({
            status: 400,
            message:
              "If the minimum number of employees for the course offering is not reached before the course date, the status of the course offering would be",
            failure: { message: "COURSE_CANCELED",data:data.course_registration.sort((a,b)=>a.registration_id-b.registration_id) },
          });
        } else {
          res
            .status(400)
            .send({
              status: 400,
              message: "course apply date is expired,try next time",
            });
           
        }}
        else if(!courseiid){
            res
            .status(400)
            .send({
              status: 400,
              message: "is not valid course_id",
              data: { failure: { Message: "course-id missing" } },
            });  
        }
        else if(max_employees<total_registered){
            res.status(400).send({
                status: 400,
                message: "COURSE_FULL_ERROR",
                data: {
                  failure: {
                    message: "cannot register for course, course if full",
                  },
                },
              });
        }
        else {
            parse.Course_allotment=parse.course_registration.filter((el)=>el.course_id===courseiid&&{...el,status:"ACCEPTED"}).sort((a,b)=>a.registration_id-b.registration_id);
            fs2.writeFileSync("./data.json", `${JSON.stringify(parse)}`);  
          res.status(400).send({
            "status": 200,
            "message": "successfully allotted course to registered employees", 
            "data": {
                "success": parse.Course_allotment
        }
        }
        )  
        }
        
})

module.exports=CourseAllotment