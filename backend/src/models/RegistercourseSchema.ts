let mongose2 = require("mongoose");
const registerschema = mongose2.Schema({
  employee_name: String,
  email: String,
  registration_id: String,
  course_id: String,
});
const Courseregistr = mongose2.model("course_registration", registerschema);
module.exports = Courseregistr;
