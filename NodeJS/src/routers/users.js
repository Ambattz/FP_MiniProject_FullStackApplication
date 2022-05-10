const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here

//Post for "/courses/enroll/:id"
usersRouter.post("/courses/enroll/:id", (res, req) => {
    const filter = { _id: req.params.id };
    const update = { isApplied: true };
    var fCourse = Course.find(filter);
    fCourse.isApplied === true ?
        (res.status(403).send({ result: fCourse, error: "You have already applied for this course" })) :
        (
            Course.findOneAndUpdate(filter, update, { new: true, runValidators: true }, (err, updatedCourse) => {
                if (err) {
                    for (field in err.errors) {
                        res.status(400).send({ error: err.errors[field].message });
                    }
                }
                else {
                    res.status(200).send({ result: updatedCourse, message: "You have successfully enrolled for the course" })
                }
            })
        );
});

module.exports = usersRouter;
