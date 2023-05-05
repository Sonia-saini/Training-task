const allot = require("express");
const Coursereg = require("../models/RegistercourseSchema");
const AllCourses = require("../models/courseSchema");
const CourseAlot = require("../models/CourseAllot");
const CourseAllotment = allot.Router();
CourseAllotment.post("/allot/:course_id", async (req: any, res: any) => {
  const courseiid = req.params.course_id;

  try {
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
    let coures = await Coursereg.find().sort({ registration_id: 1 });
    if (courseiid) {
      let courseregister = await Coursereg.find({ course_id: courseiid });

      total_registered = courseregister.length;
      let course = await AllCourses.findOne({ course_id: courseiid });
      max_employees = course.max_employees;
      min_employees = course.min_employees;
      console.log(total_registered);
      start_date = course.start_date;
      start_day = Number(start_date[0] + start_date[1]);
      start_month = Number(start_date[2] + start_date[3]);
      start_year = Number(
        start_date[4] + start_date[5] + start_date[6] + start_date[7]
      );
    }
    if (
      current_year > start_year ||
      current_month > start_month ||
      (current_year === start_year &&
        current_month === start_month &&
        current_day >= start_day)
    ) {
      if (min_employees > total_registered) {
        res.status(400).send({
          status: 400,
          message:
            "If the minimum number of employees for the course offering is not reached before the course date, the status of the course offering would be",
          failure: {
            message: "COURSE_CANCELED",
            data: coures,
          },
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "course apply date is expired,try next time",
        });
      }
    } else if (!courseiid) {
      res.status(400).send({
        status: 400,
        message: "is not valid course_id",
        data: { failure: { Message: "course-id missing" } },
      });
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
    } else {
      let x = coures.map((el: any) => {
        if (el.course_id === courseiid) {
          return {
            ...el,
            status: "Accepted",
          };
        } else {
          return el;
        }
      });

      let allallotcourse = await CourseAlot.insertMany(coures);

      res.status(200).send({
        status: 200,
        message: "successfully allotted course to registered employees",
        data: {
          success: x,
        },
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Coure allotemennt route have some problem",
      data: {
        failure: {
          message: err,
        },
      },
    });
  }
});

module.exports = CourseAllotment;
