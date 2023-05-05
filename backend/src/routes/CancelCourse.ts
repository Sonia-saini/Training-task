let cancelation = require("express");
let Canceledcourse = require("../models/CourseCancel");
let CourseRegist = require("../models/RegistercourseSchema");
let Courtealloted = require("../models/CourseAllot");
let Coursecancel = cancelation.Router();
let fs3 = require("fs");
Coursecancel.post("/cancel/:registration_id", async (req: any, res: any) => {
  const { registration_id } = req.params;

  try {
    let filterdata = await Courtealloted.find({ registration_id });
    let course = await CourseRegist.findOne().course_id;
    if (filterdata.length > 0) {
      res.status(200).send({
        status: 200,
        message: "Cancel registration unsuccessfull",
        data: {
          success: {
            registration_id: registration_id,
            course_id: course,
            status: "CANCEL_REJECTED",
          },
        },
      });
    } else if (filterdata.length === 0) {
      let data = new Coursecancel(filterdata[0]);
      await data.save();
      res.status(200).send({
        status: 200,
        message: "Cancel registration successfull",
        data: {
          success: {
            registration_id: registration_id,
            course_id: course,
            status: "CANCEL_ACCEPTED",
          },
        },
      });
    } else {
      res.status(400).send({
        status: 400,
        message: "INVALID_REGISTRATION_ID",
        data: {
          failure: {
            Message: "REGISRATION_ID DOES NOT EXIST",
          },
        },
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "cancel course route have some problem",
      data: {
        failure: {
          Message: err,
        },
      },
    });
  }
});

module.exports = Coursecancel;
