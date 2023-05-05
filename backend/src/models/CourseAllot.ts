
const allotschema = require("mongoose").Schema({
  employee_name: String,
  email: String,
  registration_id: String,
  course_id: String,
  status: String,
});
const Courseallot = require("mongoose").model("course_allotment", allotschema);
module.exports = Courseallot;
