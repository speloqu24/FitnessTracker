const router = require("express").Router();
const { Workout } = require("../models");

// JSON return of all the workouts by ID, included ones added
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      // Internal server error
      res.status(500).json(err);
    });
});

// SORTS returned data by MOST RECENT exercise
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      // Bad request error
      res.status(400).json(err);
    });
});

// ADDS exercise to the designated ID
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// POSTS new exercises
router.post("/api/workouts", (req, res) => {
  const { body } = req;
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      //
      res.status(400).json(err);
    });
});

module.exports = router;
