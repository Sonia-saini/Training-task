let mongoose4 = require("mongoose");
const cancelschema = mongoose4.Schema({
  employee_name: String,
  email: String,
  registration_id: String,
  course_id: String,
  status: String,
});
const CourseCancel = mongoose4.model("cancel_course", cancelschema);
module.exports = CourseCancel;
