import mongoose, { Mongoose } from "mongoose";

export const MongooseConnect = () =>
  mongoose.connect("mongodb://root:rootroot1@ds024548.mlab.com:24548/one12");
