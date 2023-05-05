const expres = require("express");
let courseModel = require("../models/courseSchema");
interface CourseOffering {
  course_name: string;
  instructor_name: string;
  start_date: string;
  min_employees: number;
  max_employees: number;
  course_id: string;
}

let useRouter = expres.Router();
useRouter.post("/add/courseOffering", async (req: any, res: any) => {
  const {
    course_name,
    instructor_name,
    start_date,
    min_employees,
    max_employees,
  }: CourseOffering = req.body;
  try {
    if (
      course_name &&
      instructor_name &&
      start_date &&
      min_employees &&
      max_employees
    ) {
      let courses = new courseModel({
        ...req.body,
        course_id: `OFFERING-${course_name}-${instructor_name}`,
      });
      await courses.save();
      res.status(200).json({
        status: 200,
        data: {
          success: { course_id: `OFFERING-${course_name}-${instructor_name}` },
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "INPUT_DATA_ERROR",
        data: {
          success: {
            failure:
              "instructor_name,start_date, min_employees, max_employees cannot be empty",
          },
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "allcoures route have some error",
      data: {
        success: {
          failure: err,
        },
      },
    });
  }
});
module.exports = useRouter;
