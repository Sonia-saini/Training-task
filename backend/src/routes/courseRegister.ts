let course = require("express");
let courseReg = course.Router();
interface CourseRegistration {
  employee_name: string;
  course_id: string;
  email: string;
}
const fs1 = require("fs");
courseReg.post("/add/register/:course_id", (req: any, res: any) => {
  const courseid = req.params.course_id;

  const { employee_name, course_id, email }: CourseRegistration = req.body;
  let data = fs1.readFileSync("./data.json", "utf-8");
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
  let alredyexist: number;
  if (courseid) {
    alredyexist = parse.course_registration.filter(
      (el) =>
        el.course_id === courseid &&
        employee_name === el.employee_name &&
        el.email === email
    ).length;
    total_registered = parse.course_registration.filter(
      (el) => el.course_id === courseid
    ).length;
    max_employees = parse.course.filter((el) => el.course_id === courseid)[0]
      .max_employees;
    min_employees = parse.course.filter((el) => el.course_id === courseid)[0]
      .min_employees;
    console.log(total_registered);
    start_date = parse.course.filter((el) => el.course_id === courseid)[0]
      .start_date;
    start_day = Number(start_date[0] + start_date[1]);
    start_month = Number(start_date[2] + start_date[3]);
    start_year = Number(
      start_date[4] + start_date[5] + start_date[6] + start_date[7]
    );
  }
  if (!employee_name || !email || !course_id) {
    res.status(400).send({
      status: 400,
      message: "INPUT_DATA_ERROR",
      data: { failure: { Message: "email and  course-offering-id missing" } },
    });
  } else if (
    current_year > start_year ||
    current_month > start_month ||
    current_day >= start_day
  ) {
    if (min_employees > total_registered) {
      res.status(400).send({
        status: 400,
        message:
          "If the minimum number of employees for the course offering is not reached before the course date, the status of the course offering would be",
        failure: { message: "COURSE_CANCELED" },
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "course apply date is expired,try next time",
      });
    }
  } else if (max_employees < total_registered) {
    res.status(400).send({
      status: 400,
      message: "COURSE_FULL_ERROR",
      data: {
        failure: {
          message: "cannot register for course, course if full",
        },
      },
    });
  } else if (alredyexist > 0) {
    res.status(400).send({
      status: 400,
      message: "ALREADY_APPLIED_THIS_COURSE",
      data: {
        failure: {
          message: "you are already register for this course",
        },
      },
    });
  } else {
    parse.course_registration.push({
      employee_name,
      email,
      course_id,
      registration_id: `${employee_name}-${course_id}`,
    });
    fs1.writeFileSync("./data.json", `${JSON.stringify(parse)}`);
    res.status(200).send({
      status: 200,
      message: `successfully registered for ${course_id}`,
      data: {
        success: {
          registration_id: `${employee_name}-${course_id}`,
          status: "ACCEPTED",
        },
      },
    });
  }
});
module.exports = courseReg;
