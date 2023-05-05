const mongoose1 = require("mongoose");
const userschema = mongoose1.Schema({
    course_name: String,
    instructor_name: String,
    start_date: String,
    min_employees: Number,
    max_employees: Number,
    course_id: String,
});
const Usermodel = mongoose1.model("course", userschema);
module.exports = Usermodel ;