const mongoose = require("mongoose");

//schema design
const tourSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tour name required!!!"],
      trim: true,
      unique: [true, "Already exists!!!"],
      minLength: [4, "Must be 4 characters."],
      maxLength: [100, "Too large"],
    },
    location: {
      type: String,
      required: [true, "Location required"],
      trim: true,
      minLength: [3, "Must 3 characters."],
    },
    hotel: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, "Must be 4 characters."],
    },
    description: {
      type: String,
      required: [true, "Write something about tour"],
      minLength: [15, "Describe more"],
    },
    image: {
      type: String,
      required: [true, "URL can't be empty"],
      unique: true,
      validate: {
        validator: (val) => {
          const urlRegex =
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
          if (urlRegex.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Invalid URL",
    },
    days: {
      type: Number,
      required: true,
      min: [1, "minimum 1 days."],
    },
    date: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    //   availableSeat: {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //   },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["early-booking", "on-going", "Houseful"],
        message: "Status can't be {VALUE}",
      },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.methods.logger = function () {
  console.log(`Data saved for ${this.title}`);
};

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
