const expres = require("express");

interface CourseOffering {
  course_name: string;
  instructor_name: string;
  start_date: string;
  min_employees: number;
  max_employees: number;
  course_id: string;
}
const fss = require("fs");

let useRouter = expres.Router();
useRouter.post("/add/courseOffering", (req: any, res: any) => {
  const {
    course_name,
    instructor_name,
    start_date,
    min_employees,
    max_employees,
  }: CourseOffering = req.body;

  let data = fss.readFileSync("./data.json", "utf-8");

  if (
    course_name &&
    instructor_name &&
    start_date &&
    min_employees &&
    max_employees
  ) {
    let parse = JSON.parse(data);
    parse.course.push({
      ...req.body,
      course_id: `OFFERING-${course_name}-${instructor_name}`,
    });
    fss.writeFileSync("./data.json", `${JSON.stringify(parse)}`);

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
});
module.exports = useRouter;
