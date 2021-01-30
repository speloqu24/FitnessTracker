// creates the workout Schema in workout
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

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
        // make name and duration required as well
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  opts
);

//TODO: work on virtuals
// workoutSchema.virtual("totalDuration").get(function () {
//   this.exercises[i].duration;
//   // forEach or for loop through each exercise duration add them all and return

//   return this.email.slice(this.email.indexOf("@") + 1);
// });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
