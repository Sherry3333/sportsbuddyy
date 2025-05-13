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
    { name: "Basketball", info: "A team sport played with a round ball" },
    { name: "Tennis", info: "A racket sport played on a court with a net" },
    { name: "Football", info: "A team sport played with a round ball, aiming to score goals" },
    { name: "Running", info: "An individual sport involving fast-paced movement on foot" },
    { name: "Golf", info: "A precision sport where players hit balls into holes on a course" },
    { name: "Swimming", info: "A water sport involving movement through water using limbs" },
    { name: "Cycling", info: "A sport that involves riding a bicycle for speed or endurance" },
    { name: "Yoga", info: "A physical and mental practice involving postures and breathing" },
    { name: "Volleyball", info: "A team sport where players hit a ball over a net using their hands" }
];
const sportsResponse = await Sport.insertMany(sports);
console.log(`Inserted ${sportsResponse.length} sports into the database`);

await Location.deleteMany({});
const locations = [
    // Badminton
    { name: "North Harbour Badminton Centre", description: "A major badminton venue with multiple courts in North Shore", sports_id: sportsResponse[0]._id },
    { name: "Gillies Avenue Badminton Club", description: "A community-focused badminton facility in Epsom", sports_id: sportsResponse[0]._id },
    { name: "Auckland Badminton Stadium", description: "A central venue for tournaments and casual play", sports_id: sportsResponse[0]._id },

    // Squash
    { name: "Remuera Rackets Club", description: "Premium squash and tennis courts in central Auckland", sports_id: sportsResponse[1]._id },
    { name: "North Shore Squash Club", description: "A modern squash venue popular among North Shore locals", sports_id: sportsResponse[1]._id },
    { name: "Auckland Squash Club", description: "A long-standing squash facility in Eden Terrace", sports_id: sportsResponse[1]._id },

    // Basketball
    { name: "YMCA City Stadium", description: "Indoor courts available for casual and league basketball", sports_id: sportsResponse[2]._id },
    { name: "Trusts Arena", description: "Multi-sport stadium in Henderson with full basketball facilities", sports_id: sportsResponse[2]._id },
    { name: "AUT Sport & Fitness Centre", description: "University gym with full-sized indoor courts", sports_id: sportsResponse[2]._id },

    // Tennis
    { name: "Stanley Street Tennis Centre", description: "Premier tennis facility near Auckland Domain", sports_id: sportsResponse[3]._id },
    { name: "Albany Tennis Park", description: "Large complex with indoor and outdoor tennis courts", sports_id: sportsResponse[3]._id },
    { name: "Mission Bay Tennis Club", description: "Scenic community club near Auckland’s eastern beaches", sports_id: sportsResponse[3]._id },

    // Football
    { name: "Western Springs Football Club", description: "One of Auckland’s largest and most active football clubs", sports_id: sportsResponse[4]._id },
    { name: "North Harbour Stadium", description: "Stadium for professional and community football events", sports_id: sportsResponse[4]._id },
    { name: "Keith Hay Park", description: "A public park with multiple grass football fields", sports_id: sportsResponse[4]._id },

    // Running
    { name: "Cornwall Park", description: "Popular park with scenic running trails and open fields", sports_id: sportsResponse[5]._id },
    { name: "Tamaki Drive", description: "Seaside running path stretching from CBD to Mission Bay", sports_id: sportsResponse[5]._id },
    { name: "Western Springs Park", description: "Flat, shaded track ideal for joggers and casual runners", sports_id: sportsResponse[5]._id },

    // Golf
    { name: "Auckland Golf Club", description: "Historic and exclusive golf course in South Auckland", sports_id: sportsResponse[6]._id },
    { name: "North Shore Golf Club", description: "Well-maintained course suitable for all skill levels", sports_id: sportsResponse[6]._id },
    { name: "Chamberlain Park Golf Course", description: "Public 18-hole course in Mt Albert", sports_id: sportsResponse[6]._id },

    // Swimming
    { name: "Parnell Baths", description: "Outdoor saltwater swimming complex near the waterfront", sports_id: sportsResponse[7]._id },
    { name: "Lloyd Elsmore Pool", description: "Modern indoor pool with lanes and leisure facilities", sports_id: sportsResponse[7]._id },
    { name: "Albany Stadium Pool", description: "Aquatic centre with heated pools and family zones", sports_id: sportsResponse[7]._id },

    // Cycling
    { name: "Woodhill Mountain Bike Park", description: "Popular forest park with marked MTB trails", sports_id: sportsResponse[8]._id },
    { name: "Lightpath Cycleway", description: "Iconic pink elevated path for city cycling", sports_id: sportsResponse[8]._id },
    { name: "Twin Streams Pathway", description: "Scenic riverside cycling route in West Auckland", sports_id: sportsResponse[8]._id },

    // Yoga
    { name: "Yoga Ground", description: "Peaceful studio in Mt Eden offering various yoga styles", sports_id: sportsResponse[9]._id },
    { name: "Om Yoga Studio", description: "Modern yoga studio in Stonefields with expert instructors", sports_id: sportsResponse[9]._id },
    { name: "Eastwest Yoga", description: "Popular inner-city yoga centre for all levels", sports_id: sportsResponse[9]._id },

    // Volleyball
    { name: "Gillies Avenue Volleyball Centre", description: "Indoor volleyball facility used for social and competitive play", sports_id: sportsResponse[10]._id },
    { name: "AUT North Volleyball Gym", description: "Professional indoor court located at AUT campus", sports_id: sportsResponse[10]._id },
    { name: "Trusts Arena Volleyball Hall", description: "Large-scale venue hosting volleyball tournaments", sports_id: sportsResponse[10]._id }
];


const locationsResponse = await Location.insertMany(locations);
console.log(`Inserted ${locationsResponse.length} locations into the database`);

await Team.deleteMany({});
const teams = [
    // 0. Harbour Badminton Centre - Badminton
    { name: "Harbour Smashers", loc_id: locationsResponse[0]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Beginner-friendly group to learn the basics.", image: "badmintonation.png", total_num: 8 },
    { name: "Harbour Aces", loc_id: locationsResponse[0]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Weekly fun games with mixed skills.", image: "badmintonation.png", total_num: 10 },
    { name: "Harbour Pros", loc_id: locationsResponse[0]._id, start_time: "Fri 8PM", end_time: "Fri 9PM", level: "Advanced", team_desc: "Competitive games for advanced players.", image: "badmintonation.png", total_num: 12 },

    // 1. Gillies Avenue Badminton Club - Badminton
    { name: "Gillies Beginners", loc_id: locationsResponse[1]._id, start_time: "Tue 5PM", end_time: "Tue 6PM", level: "Beginner", team_desc: "For newcomers and casual players.", image: "badmintonation.png", total_num: 8 },
    { name: "Gillies Flyers", loc_id: locationsResponse[1]._id, start_time: "Thu 6PM", end_time: "Thu 7PM", level: "Intermediate", team_desc: "Friendly rallies and practice.", image: "badmintonation.png", total_num: 10 },
    { name: "Gillies Smashers", loc_id: locationsResponse[1]._id, start_time: "Sat 10AM", end_time: "Sat 11AM", level: "Advanced", team_desc: "High-speed matches and drills.", image: "badmintonation.png", total_num: 12 },

    // 2. Auckland Badminton Stadium - Badminton
    { name: "Central Starters", loc_id: locationsResponse[2]._id, start_time: "Sun 9AM", end_time: "Sun 10AM", level: "Beginner", team_desc: "Beginner group for casual games.", image: "badmintonation.png", total_num: 6 },
    { name: "Central Smash", loc_id: locationsResponse[2]._id, start_time: "Sun 10AM", end_time: "Sun 11AM", level: "Intermediate", team_desc: "Sunday fun games every week.", image: "badmintonation.png", total_num: 8 },
    { name: "Central Blazers", loc_id: locationsResponse[2]._id, start_time: "Sun 11AM", end_time: "Sun 12PM", level: "Advanced", team_desc: "Only for competitive-level players.", image: "badmintonation.png", total_num: 10 },

    // 3. Remuera Rackets Club - Squash
    { name: "Remuera Rookies", loc_id: locationsResponse[3]._id, start_time: "Mon 5PM", end_time: "Mon 6PM", level: "Beginner", team_desc: "Intro to squash for new players.", image: "squash.png", total_num: 6 },
    { name: "Remuera Rebels", loc_id: locationsResponse[3]._id, start_time: "Wed 6PM", end_time: "Wed 7PM", level: "Intermediate", team_desc: "Friendly games and weekly practice.", image: "squash.png", total_num: 8 },
    { name: "Remuera Titans", loc_id: locationsResponse[3]._id, start_time: "Fri 7PM", end_time: "Fri 8PM", level: "Advanced", team_desc: "Fast-paced advanced group matches.", image: "squash.png", total_num: 10 },

    // 4. North Shore Squash Club - Squash
    { name: "Shore Starters", loc_id: locationsResponse[4]._id, start_time: "Tue 4PM", end_time: "Tue 5PM", level: "Beginner", team_desc: "Relaxed games for learning squash.", image: "squash.png", total_num: 6 },
    { name: "Shore Strikers", loc_id: locationsResponse[4]._id, start_time: "Thu 6PM", end_time: "Thu 7PM", level: "Intermediate", team_desc: "Build skills and enjoy friendly matches.", image: "squash.png", total_num: 8 },
    { name: "Shore Masters", loc_id: locationsResponse[4]._id, start_time: "Sat 1PM", end_time: "Sat 2PM", level: "Advanced", team_desc: "Training group for experienced players.", image: "squash.png", total_num: 10 },

    // 5. Eden Epsom Squash Club - Squash
    { name: "Eden Entry", loc_id: locationsResponse[5]._id, start_time: "Mon 4PM", end_time: "Mon 5PM", level: "Beginner", team_desc: "New players welcome!", image: "squash.png", total_num: 6 },
    { name: "Eden Eagles", loc_id: locationsResponse[5]._id, start_time: "Wed 5PM", end_time: "Wed 6PM", level: "Intermediate", team_desc: "Weekly group practice session.", image: "squash.png", total_num: 8 },
    { name: "Eden Elite", loc_id: locationsResponse[5]._id, start_time: "Sat 3PM", end_time: "Sat 4PM", level: "Advanced", team_desc: "Fast games and tournament prep.", image: "squash.png", total_num: 10 },

    // 6. ASB Stadium - Basketball
    { name: "CBD Ballers", loc_id: locationsResponse[6]._id, start_time: "Fri 6PM", end_time: "Fri 7PM", level: "Beginner", team_desc: "After-work casual games.", image: "basketball.png", total_num: 10 },
    { name: "CBD Jumpers", loc_id: locationsResponse[6]._id, start_time: "Sun 6PM", end_time: "Sun 7PM", level: "Intermediate", team_desc: "Weekly 5v5 sessions.", image: "basketball.png", total_num: 12 },
    { name: "CBD Slam", loc_id: locationsResponse[6]._id, start_time: "Wed 8PM", end_time: "Wed 9PM", level: "Advanced", team_desc: "Competitive matches every week.", image: "basketball.png", total_num: 14 },

    // 7. Trusts Arena - Basketball
    { name: "Henderson Hoopers", loc_id: locationsResponse[7]._id, start_time: "Sat 4PM", end_time: "Sat 5PM", level: "Beginner", team_desc: "Open to all casual players.", image: "basketball.png", total_num: 8 },
    { name: "Henderson Hustle", loc_id: locationsResponse[7]._id, start_time: "Tue 6PM", end_time: "Tue 7PM", level: "Intermediate", team_desc: "Friendly matches and drills.", image: "basketball.png", total_num: 10 },
    { name: "Henderson Heat", loc_id: locationsResponse[7]._id, start_time: "Thu 7PM", end_time: "Thu 8PM", level: "Advanced", team_desc: "Serious team play for advanced ballers.", image: "basketball.png", total_num: 12 },
    
    // 9. Stanley Street Tennis Centre - Tennis
    { name: "Windmill Aces", loc_id: locationsResponse[9]._id, start_time: "Tue 4PM", end_time: "Tue 5PM", level: "Beginner", team_desc: "Learn tennis basics and have fun.", image: "tennis.png", total_num: 4 },
    { name: "Windmill Strikers", loc_id: locationsResponse[9]._id, start_time: "Thu 5PM", end_time: "Thu 6PM", level: "Intermediate", team_desc: "Practice games with light competition.", image: "tennis.png", total_num: 6 },

    // 10. Albany Tennis Park - Tennis
    { name: "Albany Aces", loc_id: locationsResponse[10]._id, start_time: "Mon 4PM", end_time: "Mon 5PM", level: "Beginner", team_desc: "Casual games for beginners.", image: "tennis.png", total_num: 6 },
    { name: "Albany Strikers", loc_id: locationsResponse[10]._id, start_time: "Wed 5PM", end_time: "Wed 6PM", level: "Intermediate", team_desc: "Intermediate players welcome.", image: "tennis.png", total_num: 8 },

    // 11. Mission Bay Tennis Club - Tennis
    { name: "Mission Bay Aces", loc_id: locationsResponse[11]._id, start_time: "Tue 4PM", end_time: "Tue 5PM", level: "Beginner", team_desc: "Casual games for beginners.", image: "tennis.png", total_num: 6 },
    { name: "Mission Bay Strikers", loc_id: locationsResponse[11]._id, start_time: "Thu 5PM", end_time: "Thu 6PM", level: "Intermediate", team_desc: "Intermediate players welcome.", image: "tennis.png", total_num: 8 },

    // 12. Western Springs Football Club - Football
    { name: "Te Pai Kickers", loc_id: locationsResponse[12]._id, start_time: "Wed 6PM", end_time: "Wed 7PM", level: "Beginner", team_desc: "Social football for all skill levels.", image: "football.png", total_num: 10 },
    { name: "Te Pai Strikers", loc_id: locationsResponse[12]._id, start_time: "Sat 4PM", end_time: "Sat 5PM", level: "Advanced", team_desc: "Fast-paced matches for serious players.", image: "football.png", total_num: 14 },

    // 13. North Harbour Stadium - Football
    { name: "North Harbour Aces", loc_id: locationsResponse[13]._id, start_time: "Tue 6PM", end_time: "Tue 7PM", level: "Beginner", team_desc: "Casual games for beginners.", image: "football.png", total_num: 10 },
    { name: "North Harbour Strikers", loc_id: locationsResponse[13]._id, start_time: "Thu 7PM", end_time: "Thu 8PM", level: "Intermediate", team_desc: "Intermediate players welcome.", image: "football.png", total_num: 12 },

    // 14. Keith Hay Park - Football
    { name: "Keith Hay Aces", loc_id: locationsResponse[14]._id, start_time: "Tue 6PM", end_time: "Tue 7PM", level: "Beginner", team_desc: "Casual games for beginners.", image: "football.png", total_num: 10 },
    { name: "Keith Hay Strikers", loc_id: locationsResponse[14]._id, start_time: "Thu 7PM", end_time: "Thu 8PM", level: "Intermediate", team_desc: "Intermediate players welcome.", image: "football.png", total_num: 12 },

    // 15. Cornwall Park - Running
    { name: "Cornwall Runners", loc_id: locationsResponse[15]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual running group for beginners.", image: "running.png", total_num: 8 },
    { name: "Cornwall Strikers", loc_id: locationsResponse[15]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate runners welcome.", image: "running.png", total_num: 10 },

    // 16. Tamaki Drive - Running
    { name: "Tamaki Runners", loc_id: locationsResponse[16]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual running group for beginners.", image: "running.png", total_num: 8 },
    { name: "Tamaki Strikers", loc_id: locationsResponse[16]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate runners welcome.", image: "running.png", total_num: 10 },

    // 17. Western Springs Park - Running
    { name: "Western Springs Runners", loc_id: locationsResponse[17]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual running group for beginners.", image: "running.png", total_num: 8 },
    { name: "Western Springs Strikers", loc_id: locationsResponse[17]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate runners welcome.", image: "running.png", total_num: 10 },

    // 18. Auckland Golf Club - Golf
    { name: "Auckland Aces", loc_id: locationsResponse[18]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual golf group for beginners.", image: "golf.png", total_num: 8 },
    { name: "Auckland Strikers", loc_id: locationsResponse[18]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate golfers welcome.", image: "golf.png", total_num: 10 },

    // 19. North Shore Golf Club - Golf
    { name: "North Shore Aces", loc_id: locationsResponse[19]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual golf group for beginners.", image: "golf.png", total_num: 8 },
    { name: "North Shore Strikers", loc_id: locationsResponse[19]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate golfers welcome.", image: "golf.png", total_num: 10 },
    
    // 20. Chamberlain Park Golf Course - Golf
    { name: "Chamberlain Runners", loc_id: locationsResponse[20]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual golf group for beginners.", image: "golf.png", total_num: 8 },
    { name: "Chamberlain Strikers", loc_id: locationsResponse[20]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate golfers welcome.", image: "golf.png", total_num: 10 },
    
    // 21. Parnell Baths - Swimming
    { name: "Parnell Aces", loc_id: locationsResponse[21]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual swimming group for beginners.", image: "swimming.png", total_num: 8 },
    { name: "Parnell Strikers", loc_id: locationsResponse[21]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate swimmers welcome.", image: "swimming.png", total_num: 10 },

    // 22. Lloyd Elsmore Pool - Swimming
    { name: "Lloyd Elsmore Aces", loc_id: locationsResponse[22]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual swimming group for beginners.", image: "swimming.png", total_num: 8 },
    { name: "Lloyd Elsmore Strikers", loc_id: locationsResponse[22]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate swimmers welcome.", image: "swimming.png", total_num: 10 },

    // 23. Albany Stadium Pool - Swimming
    { name: "Albany Aces", loc_id: locationsResponse[23]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual swimming group for beginners.", image: "swimming.png", total_num: 8 },
    { name: "Albany Strikers", loc_id: locationsResponse[23]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate swimmers welcome.", image: "swimming.png", total_num: 10 },   

    // 24. Woodhill Forest - Cycling
    { name: "Woodhill Aces", loc_id: locationsResponse[24]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual cycling group for beginners.", image: "cycling.png", total_num: 8 },
    { name: "Woodhill Strikers", loc_id: locationsResponse[24]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate cyclists welcome.", image: "cycling.png", total_num: 10 },
    
    // 25. Lightpath - Cycling
    { name: "Lightpath Aces", loc_id: locationsResponse[25]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual cycling group for beginners.", image: "cycling.png", total_num: 8 },
    { name: "Lightpath Strikers", loc_id: locationsResponse[25]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate cyclists welcome.", image: "cycling.png", total_num: 10 },

    // 26. Twin Streams - Cycling
    { name: "Twin Streams Aces", loc_id: locationsResponse[26]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual cycling group for beginners.", image: "cycling.png", total_num: 8 },
    { name: "Twin Streams Strikers", loc_id: locationsResponse[26]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate cyclists welcome.", image: "cycling.png", total_num: 10 }, 

    // 27. Yoga Ground - Yoga
    { name: "Yoga Ground Aces", loc_id: locationsResponse[27]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual yoga group for beginners.", image: "yoga.png", total_num: 8 },
    { name: "Yoga Ground Strikers", loc_id: locationsResponse[27]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate yogis welcome.", image: "yoga.png", total_num: 10 },

    // 28. Om Yoga - Yoga
    { name: "Om Aces", loc_id: locationsResponse[28]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual yoga group for beginners.", image: "yoga.png", total_num: 8 },
    { name: "Om Strikers", loc_id: locationsResponse[28]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate yogis welcome.", image: "yoga.png", total_num: 10 },
    
    // 29. Eastwest yoga    
    { name: "Eastwest Aces", loc_id: locationsResponse[29]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual yoga group for beginners.", image: "yoga.png", total_num: 8 },
    { name: "Eastwest Strikers", loc_id: locationsResponse[29]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate yogis welcome.", image: "yoga.png", total_num: 10 },

    // 30. Gillies Avenue Volleyball
    { name: "Gillies Aces", loc_id: locationsResponse[30]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual volleyball group for beginners.", image: "volleyball.png", total_num: 8 },
    { name: "Gillies Strikers", loc_id: locationsResponse[30]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate volleyball players welcome.", image: "volleyball.png", total_num: 10 },   

    // 31. AUT North Volleyball Gym
    { name: "AUT North Aces", loc_id: locationsResponse[31]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual volleyball group for beginners.", image: "volleyball.png", total_num: 8 },
    { name: "AUT North Strikers", loc_id: locationsResponse[31]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate volleyball players welcome.", image: "volleyball.png", total_num: 10 },

    // 32. Trusts Arena Volleyball Hall
    { name: "Trusts Arena Aces", loc_id: locationsResponse[32]._id, start_time: "Mon 6PM", end_time: "Mon 7PM", level: "Beginner", team_desc: "Casual volleyball group for beginners.", image: "volleyball.png", total_num: 8 },
    { name: "Trusts Arena Strikers", loc_id: locationsResponse[32]._id, start_time: "Wed 7PM", end_time: "Wed 8PM", level: "Intermediate", team_desc: "Intermediate volleyball players welcome.", image: "volleyball.png", total_num: 10 }
    
];

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