const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

// MONGO schema
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          required: "Enter a type",
        },
        name: {
          type: String,
          required: "Please enter the name of the workout",
        },
        duration: {
          type: Number,
          required: "Enter a duration",
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  opts
);

// VIRTUAL that does not get stored in MongoDb, but does increment!
workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
    //accumulator  // currentValue
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
