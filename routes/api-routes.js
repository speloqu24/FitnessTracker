const router = require("express").Router();
const { Workout } = require("../models");

// TODO: Aggregates if you want

// Getting seed workouts
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

// MONGOOSE V

//
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

//TODO: Updated workout

//Sets or PUSHES -> which one to use? from mongoose

// Creates an object workout under a specific ID
// router.put("/api/workouts/:id", (req, res) => {
//   Workout.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, data) => {
//       console.log(data);
//       if (err) return res.status(500).send(err);
//       return res.send(data);
//     }
//   );
// });

// Creates an exercise object
router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { __id: req.params.id },
    {
      $inc: { totalDuration: req.body.duration },
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
