import mongoose from "mongoose";

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: true,
    },
    Surname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    AdmNo: {
      type: String,
      required: true,
      unique: true,
    },
    Class: {
      type: String,
      required: true,
    },
    ParentName: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    ParentPhoneNo: {
      type: String,
      required: true,
    },
    MedicalCondition: {
      type: Boolean,
      default: false,
    },
    ConditionDetails: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt timestamps
  }
);

// Create the model
export const Student = mongoose.model('StudentInfo', studentSchema);
