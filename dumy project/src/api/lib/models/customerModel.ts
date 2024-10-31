import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  dateOfBirth: String,
  category: [String],
  country: String,
  profilePicture: String,
  productImages: [String],
  permissions: {
    read: Boolean,
    write: Boolean,
    delete: Boolean,
  },
  name: String,
  email: String,
  website: String,
  calendar: [Schema.Types.Mixed],
});

export const Customer = models?.Customer || model("Customer", customerSchema);
