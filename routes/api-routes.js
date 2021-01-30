const router = require("express").Router();
const { Workout } = require("../models");

// TODO: Aggregates if you want
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// MONGOOSE V

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//TODO: Updated workout

//Sets or PUSHES -> which one to use? from mongoose

// router.put("/api/workouts/:id", (req, res) => {
//     Workout.findByIdAndUpdate(
//         req.params.id,
//         req.body
//     )
// })

router.post("/api/workouts", (req, res) => {
  const { body } = req;
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
