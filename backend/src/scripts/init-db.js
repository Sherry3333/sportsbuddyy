import "dotenv/config";
import mongoose from "mongoose";
import User from "../data/UserSchema.js";
import Sport from "../data/SportSchema.js";
import Location from "../data/LocationSchema.js";
import Team from "../data/TeamSchema.js";
import TeamUser from "../data/TeamUserSchema.js";
import e from "express";

await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log("Connected to database");

await User.deleteMany({});
await TeamUser.deleteMany({});
await Team.deleteMany({});
await Location.deleteMany({});
await Sport.deleteMany({});
console.log("Deleted all existing data from the database");

const users = [
    { username: "test1", gender: "male", sports: "swimming", level: "1", email: "test1@test.com", password: "123456" },
    { username: "test2", gender: "male", sports: "swimming", level: "1", email: "test2@test.com", password: "123456" },
    { username: "test3", gender: "male", sports: "swimming", level: "1", email: "test3@test.com", password: "123456" },
    { username: "test4", gender: "female", sports: "badminton", level: "2", email: "test4@test.com", password: "123456" },
    { username: "test5", gender: "female", sports: "squash", level: "2", email: "test5@test.com", password: "123456" },
    { username: "test6", gender: "male", sports: "basketball", level: "3", email: "test6@test.com", password: "123456" },
    { username: "test7", gender: "female", sports: "badminton", level: "1", email: "test7@test.com", password: "123456" },
    { username: "test8", gender: "male", sports: "squash", level: "2", email: "test8@test.com", password: "123456" },
    { username: "test9", gender: "female", sports: "basketball", level: "3", email: "test9@test.com", password: "123456" },
    { username: "test10", gender: "male", sports: "badminton", level: "1", email: "test10@test.com", password: "123456" },
    { username: "test11", gender: "female", sports: "squash", level: "2", email: "test11@test.com", password: "123456" },
    { username: "test12", gender: "male", sports: "basketball", level: "3", email: "test12@test.com", password: "123456" },
    { username: "test13", gender: "female", sports: "badminton", level: "2", email: "test13@test.com", password: "123456" },
    { username: "test14", gender: "male", sports: "squash", level: "1", email: "test14@test.com", password: "123456" },
    { username: "test15", gender: "female", sports: "basketball", level: "3", email: "test15@test.com", password: "123456" },
    { username: "test16", gender: "male", sports: "badminton", level: "1", email: "test16@test.com", password: "123456" },
    { username: "test17", gender: "female", sports: "squash", level: "2", email: "test17@test.com", password: "123456" },
    { username: "test18", gender: "male", sports: "basketball", level: "3", email: "test18@test.com", password: "123456" },
    { username: "test19", gender: "female", sports: "badminton", level: "2", email: "test19@test.com", password: "123456" }
];

const usersResponse = await User.insertMany(users);
console.log(`Inserted ${usersResponse.length} users into the database`);

const sports = [
    { name: "Badminton", info: "A racket sport played with a shuttlecock" },
    { name: "Squash", info: "A fast-paced racket sport played in an enclosed court" },
    { name: "Basketball", info: "A team sport played with a round ball" }
];
const sportsResponse = await Sport.insertMany(sports);
console.log(`Inserted ${sportsResponse.length} sports into the database`);

await Location.deleteMany({});
const locations = [
    { name: "Badminton North Harbour", description: "A major badminton centre in North Shore, Auckland", sports_id: sportsResponse[0]._id },
    { name: "Gillies Avenue Badminton Club", description: "A community badminton club in Epsom, Auckland", sports_id: sportsResponse[0]._id },
    { name: "Auckland Badminton Stadium", description: "A central venue for badminton tournaments and training", sports_id: sportsResponse[0]._id },
    { name: "Remuera Rackets Club", description: "Premium squash courts available in central Auckland", sports_id: sportsResponse[1]._id },
    { name: "North Shore Squash Club", description: "Popular squash venue in Takapuna", sports_id: sportsResponse[1]._id },
    { name: "Auckland Squash Club", description: "A long-established squash facility in Eden Terrace", sports_id: sportsResponse[1]._id },
    { name: "YMCA City Stadium", description: "Indoor basketball courts in Auckland CBD", sports_id: sportsResponse[2]._id },
    { name: "Trusts Arena", description: "A multi-sport stadium in Henderson with basketball facilities", sports_id: sportsResponse[2]._id },
    { name: "AUT Sport & Fitness Centre", description: "University gym with full-sized basketball courts", sports_id: sportsResponse[2]._id }
];

const locationsResponse = await Location.insertMany(locations);
console.log(`Inserted ${locationsResponse.length} locations into the database`);

await Team.deleteMany({});
const teams = [
    // Badminton (locations 0-2)
    { name: "Harbour Smashers", loc_id: locationsResponse[0]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Fun beginner badminton group", image: "badmintonation.png", total_num: 8 },
    { name: "Harbour Pros", loc_id: locationsResponse[0]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Advanced", team_desc: "Advanced players only", image: "badmintonation.png", total_num: 10 },
    { name: "Gillies Flyers", loc_id: locationsResponse[1]._id, start_time: "Tue 5PM", end_time: "Tue 6PM", level: "Beginner", team_desc: "Learn and play casually", image: "badmintonation.png", total_num: 8 },
    { name: "Gillies Elite", loc_id: locationsResponse[1]._id, start_time: "Thu 6PM", end_time: "Thu 7PM", level: "Advanced", team_desc: "Training for tournaments", image: "badmintonation.png", total_num: 12 },
    { name: "Central Shuttlers", loc_id: locationsResponse[2]._id, start_time: "Sat 9AM", end_time: "Sat 10AM", level: "Intermediate", team_desc: "Weekly game group", image: "badmintonation.png", total_num: 10 },
    { name: "Central Smash", loc_id: locationsResponse[2]._id, start_time: "Sun 10AM", end_time: "Sun 11AM", level: "Beginner", team_desc: "Newcomer friendly", image: "badmintonation.png", total_num: 6 },

    // Squash (locations 3-5)
    { name: "Remuera Rookies", loc_id: locationsResponse[3]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Intro to squash", image: "default.png", total_num: 6 },
    { name: "Remuera Kings", loc_id: locationsResponse[3]._id, start_time: "Fri 5PM", end_time: "Fri 6PM", level: "Advanced", team_desc: "Strong competition group", image: "default.png", total_num: 10 },
    { name: "Shore Smashers", loc_id: locationsResponse[4]._id, start_time: "Wed 6PM", end_time: "Wed 7PM", level: "Intermediate", team_desc: "Regular game night", image: "default.png", total_num: 8 },
    { name: "Shore Warriors", loc_id: locationsResponse[4]._id, start_time: "Sun 4PM", end_time: "Sun 5PM", level: "Beginner", team_desc: "Fun and social play", image: "default.png", total_num: 8 },
    { name: "Eden Elite", loc_id: locationsResponse[5]._id, start_time: "Sat 11AM", end_time: "Sat 12PM", level: "Advanced", team_desc: "Only for serious players", image: "default.png", total_num: 10 },
    { name: "Eden Learners", loc_id: locationsResponse[5]._id, start_time: "Tue 4PM", end_time: "Tue 5PM", level: "Beginner", team_desc: "Learning basics", image: "default.png", total_num: 6 },

    // Basketball (locations 6-8)
    { name: "CBD Ballers", loc_id: locationsResponse[6]._id, start_time: "Fri 6PM", end_time: "Fri 7PM", level: "Beginner", team_desc: "After-work games", image: "basketball.png", total_num: 10 },
    { name: "City Slam", loc_id: locationsResponse[6]._id, start_time: "Sun 6PM", end_time: "Sun 7PM", level: "Advanced", team_desc: "City-wide competitions", image: "basketball.png", total_num: 14 },
    { name: "Henderson Hoopers", loc_id: locationsResponse[7]._id, start_time: "Sat 4PM", end_time: "Sat 5PM", level: "Intermediate", team_desc: "Team for regular pick-up", image: "basketball.png", total_num: 12 },
    { name: "Henderson Beginners", loc_id: locationsResponse[7]._id, start_time: "Wed 5PM", end_time: "Wed 6PM", level: "Beginner", team_desc: "Social basketball", image: "basketball.png", total_num: 8 }]
const teamsResponse = await Team.insertMany(teams);
console.log(`Inserted ${teamsResponse.length} teams into the database`);

await TeamUser.deleteMany({});
const teamUsers = [
    { team_id: teamsResponse[0]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[0]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[0]._id, user_id: usersResponse[2]._id },

    { team_id: teamsResponse[1]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[1]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[1]._id, user_id: usersResponse[3]._id },

    { team_id: teamsResponse[2]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[2]._id, user_id: usersResponse[3]._id },
    { team_id: teamsResponse[2]._id, user_id: usersResponse[4]._id },

    { team_id: teamsResponse[3]._id, user_id: usersResponse[3]._id },
    { team_id: teamsResponse[3]._id, user_id: usersResponse[4]._id },
    { team_id: teamsResponse[3]._id, user_id: usersResponse[5]._id },

    { team_id: teamsResponse[4]._id, user_id: usersResponse[4]._id },
    { team_id: teamsResponse[4]._id, user_id: usersResponse[5]._id },
    { team_id: teamsResponse[4]._id, user_id: usersResponse[6]._id },

    { team_id: teamsResponse[5]._id, user_id: usersResponse[5]._id },
    { team_id: teamsResponse[5]._id, user_id: usersResponse[6]._id },
    { team_id: teamsResponse[5]._id, user_id: usersResponse[7]._id },

    { team_id: teamsResponse[6]._id, user_id: usersResponse[6]._id },
    { team_id: teamsResponse[6]._id, user_id: usersResponse[7]._id },
    { team_id: teamsResponse[6]._id, user_id: usersResponse[8]._id },

    { team_id: teamsResponse[7]._id, user_id: usersResponse[7]._id },
    { team_id: teamsResponse[7]._id, user_id: usersResponse[8]._id },
    { team_id: teamsResponse[7]._id, user_id: usersResponse[0]._id },

    { team_id: teamsResponse[8]._id, user_id: usersResponse[8]._id },
    { team_id: teamsResponse[8]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[8]._id, user_id: usersResponse[1]._id },

    { team_id: teamsResponse[9]._id, user_id: usersResponse[0]._id },
    { team_id: teamsResponse[9]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[9]._id, user_id: usersResponse[4]._id },

    { team_id: teamsResponse[10]._id, user_id: usersResponse[1]._id },
    { team_id: teamsResponse[10]._id, user_id: usersResponse[3]._id },
    { team_id: teamsResponse[10]._id, user_id: usersResponse[5]._id },

    { team_id: teamsResponse[11]._id, user_id: usersResponse[2]._id },
    { team_id: teamsResponse[11]._id, user_id: usersResponse[4]._id },
    { team_id: teamsResponse[11]._id, user_id: usersResponse[6]._id },

    { team_id: teamsResponse[12]._id, user_id: usersResponse[3]._id },
    { team_id: teamsResponse[12]._id, user_id: usersResponse[5]._id },
    { team_id: teamsResponse[12]._id, user_id: usersResponse[7]._id },

    { team_id: teamsResponse[13]._id, user_id: usersResponse[4]._id },
    { team_id: teamsResponse[13]._id, user_id: usersResponse[6]._id },
    { team_id: teamsResponse[13]._id, user_id: usersResponse[8]._id },

    { team_id: teamsResponse[14]._id, user_id: usersResponse[5]._id },
    { team_id: teamsResponse[14]._id, user_id: usersResponse[7]._id },
    { team_id: teamsResponse[14]._id, user_id: usersResponse[0]._id },

    { team_id: teamsResponse[15]._id, user_id: usersResponse[6]._id },
    { team_id: teamsResponse[15]._id, user_id: usersResponse[8]._id },
    { team_id: teamsResponse[15]._id, user_id: usersResponse[1]._id },
];

const response4 = await TeamUser.insertMany(teamUsers);
console.log(`Inserted ${response4.length} team users into the database`);
console.log("Database initialized successfully");
await mongoose.disconnect();
console.log("Disconnected from database");