import "dotenv/config";
import mongoose from "mongoose";
import User from "../data/UserSchema.js";

await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("Connected to database");

await User.deleteMany({});

// const users = [
//     {name:"hisky", password:"123456"},
//     {name:"admin", password:"admin"},
//     {name:"user", password:"user"},
//     {name:"test", password:"test"},
//     {name:"guest", password:"guest"}
// ];

// const response = await User.insertMany(users);
// console.log(`Inserted ${response.length} users into the database`);

await mongoose.disconnect();
console.log("Disconnected from database");