const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//Get for "/courses/get"
usersRouter.get("/courses/get", (req, res) => {
    Course.find({}, (err, docs) => {
        if (err) {
            res.status(400).send();
        }
        res.status(200).send(docs)
    })
});
//Post for "/courses/enroll/:id"
usersRouter.post("/courses/enroll/:id", (req, res) => {
    const filter = { _id: req.params.id };
    const update = { isApplied: true };
    Course.find(filter, (err, docs) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        else {
            docs[0].isApplied ?
                (res.status(403).send({ result: docs, error: "You have already applied for this course" })) :
                (
                    Course.findOneAndUpdate(filter, update, { new: true, runValidators: true }, (err, updatedCourse) => {
                        if (err) {
                            res.status(400).send({ error: err });
                        }
                        else {
                            res.status(200).send({ result: updatedCourse, message: "You have successfully enrolled for the course" })
                        }
                    })
                );
        }
    });
});
//Delete for  "/courses/drop/:id"
usersRouter.delete("/courses/drop/:id", (req, res) => {
    const filter = { _id: req.params.id };
    const update = { isApplied: false };
    Course.find(filter, (err, docs) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        else {
            docs[0].isApplied === false ?
                (res.status(403).send({ result: docs, error: "You have not enrolled for this course" })) :
                (
                    Course.findOneAndUpdate(filter, update, { new: true, runValidators: true }, (err, updatedCourse) => {
                        if (err) {
                            res.status(400).send({ error: err });
                        }
                        else {
                            res.status(200).send({ result: updatedCourse, message: "You have dropped the course" })
                        }
                    })
                );
        }
    });
});
//Patch for  "/courses/drop/:id"
usersRouter.patch("/courses/rating/:id", (req, res) => {
    const filter = { _id: req.params.id };

    Course.find(filter, (err, docs) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        else {
            const update = {
                isRated: true,
                noOfRatings: parseInt(docs[0].noOfRatings) + 1,
                rating: (((docs[0].rating * docs[0].noOfRatings) + req.body.rating) / (docs[0].noOfRatings + 1)).toFixed(1)
            };
            docs[0].isApplied === false ?
                (res.status(403).send({ result: docs, error: "You have not enrolled for this course" })) :
                (
                    docs[0].isRated === true ?
                        (res.status(403).send({ result: docs, error: "You have rated this course" })) :
                        (
                            Course.findOneAndUpdate(filter, update, { new: true, runValidators: true }, (err, updatedCourse) => {
                                if (err) {
                                    res.status(400).send({ error: err });
                                }
                                else {
                                    res.status(200).send({ result: updatedCourse, message: "You have rated this course" })
                                }
                            })
                        )
                );
        }
    });
});
module.exports = usersRouter;
