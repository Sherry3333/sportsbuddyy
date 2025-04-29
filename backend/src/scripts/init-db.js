import "dotenv/config";
import mongoose from "mongoose";
import User from "../data/UserSchema.js";
import Sport from "../data/SportSchema.js";
import Location from "../data/LocationSchema.js";
import Team from "../data/TeamSchema.js";
import TeamUser from "../data/TeamUserSchema.js";

await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("Connected to database");

await User.deleteMany({});
await TeamUser.deleteMany({});
await Team.deleteMany({});
await Location.deleteMany({});
await Sport.deleteMany({});
console.log("Deleted all existing data from the database");

const users = [
    {
        username: "test1",
        gender: "male",
        sports: "swimming",
        level: "1",
        email: "test1@test.com",
        password: "123456"
    },
    {
        username: "test2",
        gender: "male",
        sports: "swimming",
        level: "1",
        email: "test2@test.com",
        password: "123456"
    },
    {
        username: "test3",
        gender: "male",
        sports: "swimming",
        level: "1",
        email: "test3@test.com",
        password: "123456"
    }
];
const usersResponse = await User.insertMany(users);
console.log(`Inserted ${usersResponse.length} users into the database`);

const sports = [
    { name: "Soccer", info: "A team sport played with a round ball" },
    { name: "Basketball", info: "A team sport played with a round ball" },
    { name: "Golf", info: "A club-and-ball sport played on a course" },
];
const sportsResonse = await Sport.insertMany(sports);
console.log(`Inserted ${sportsResonse.length} sports into the database`);

await Location.deleteMany({});
const locations = [
    { name: "Stadium", description: "A large venue for sports events", sports_id: sportsResonse[0]._id },
    { name: "Arena", description: "A large indoor venue for sports events", sports_id: sportsResonse[1]._id },
    { name: "Golf Course", description: "A large outdoor venue for golf", sports_id: sportsResonse[2]._id },
];
const locationsResponse = await Location.insertMany(locations);
console.log(`Inserted ${locationsResponse.length} locations into the database`);

await Team.deleteMany({});
const teams = [
    {
        name: "Team A", loc_id: locationsResponse[0]._id,
        time: "Every Saturday 9AM",
        level: "Beginner",
        image: "team-a.jpg", total_num: 10
    },
    {
        name: "Team B", loc_id: locationsResponse[1]._id,
        time: "Every Sunday 10AM",
        level: "Intermediate",
        image: "team-b.jpg", total_num: 15
    },
    {
        name: "Team C", loc_id: locationsResponse[2]._id,
        time: "Every Friday 11AM",
        level: "Advanced",
        image: "team-c.jpg", total_num: 20
    }
];
const teamsResponse = await Team.insertMany(teams);
console.log(`Inserted ${teamsResponse.length} teams into the database`);

await TeamUser.deleteMany({});
const teamUsers = [
    { team_id: teamsResponse[0]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[0]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[0]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[1]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[1]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[1]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[2]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[2]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[2]._id, user_id: usersResponse[2]._id }
];
const response4 = await TeamUser.insertMany(teamUsers);
console.log(`Inserted ${response4.length} team users into the database`);
console.log("Database initialized successfully");
await mongoose.disconnect();
console.log("Disconnected from database");