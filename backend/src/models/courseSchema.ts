let mongose1 = require("mongoose");
const courseschema = mongose1.Schema({
  course_name: String,
  instructor_name: String,
  start_date: String,
  min_employees: Number,
  max_employees: Number,
  course_id: String,
});
const Coursemodel = mongose1.model("course", courseschema);
module.exports = Coursemodel;
