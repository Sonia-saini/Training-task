let cancelation=require("express");
let Coursecancel=cancelation.Router();
let fs3=require("fs");
Coursecancel.post("/cancel/:registration_id",(req:any,res:any)=>{
const {registration_id}=req.params;
let data = fs3.readFileSync("./data.json", "utf-8");
let parse = JSON.parse(data);
let filterdata=parse.Course_allotment.filter((el)=>el.registration_id===registration_id);
let course=parse.course_registration.filter((el)=>el.registration_id===registration_id)[0].course_id;
if(filterdata.length>0){
    res.status(200).send({
        "status": 200,
        "message": "Cancel registration unsuccessfull", 
        "data": {
            "success": {
     "registration_id":registration_id,
                "course_id":course,
    status:"CANCEL_REJECTED"
                               }
                      }
    }
    )
}
else if(filterdata.length===0){
    parse.course_cancel.push(filterdata[0])
    fs3.writeFileSync("./data.json", `${JSON.stringify(parse)}`); 
    res.status(200).send({
        "status": 200,
        "message": "Cancel registration successfull", 
        "data": {
            "success": {
     "registration_id":registration_id,
                "course_id":course,
    status:"CANCEL_ACCEPTED"
                               }
                      }
    }
    )   
}
else{
    res.status(400).send({
        "status": 400,
        "message": "INVALID_REGISTRATION_ID", 
        "data": {
            "failure": {
                "Message":"REGISRATION_ID DOES NOT EXIST"
            }
        }
    }
    
    )
}
})

module.exports=Coursecancel;