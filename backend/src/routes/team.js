import express from 'express';
import auth from '../middleware/auth.js';
import Team from '../data/TeamSchema.js';
import TeamUser from '../data/TeamUserSchema.js';
import Sport from '../data/SportSchema.js';
import Location from '../data/LocationSchema.js';
import mongoose from "mongoose";

const router = express.Router();

/**
 * @swagger
 * /api/team/list/{loc_id}:
 *   get:
 *     summary: Get all teams under a specific location, including current member count
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: loc_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the location
 *     responses:
 *       200:
 *         description: Successfully fetched teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Teams fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 661ce45b...
 *                       name:
 *                         type: string
 *                         example: Morning Runners
 *                       time:
 *                         type: string
 *                         example: 08:00 AM
 *                       level:
 *                         type: string
 *                         example: Intermediate
 *                       image:
 *                         type: string
 *                         example: team.jpg
 *                       total_num:
 *                         type: number
 *                         example: 10
 *                       current_num:
 *                         type: number
 *                         example: 4
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/list/:loc_id", auth, async (req, res) => {
    try {
      const { loc_id } = req.params;
      const teams = await Team.find({ loc_id });

      const teamsWithCurrentCount = await Promise.all(
        teams.map(async (team) => {
          const currentCount = await TeamUser.countDocuments({ team_id: team._id });
          return {
            ...team._doc,
            current_num: currentCount
          };
        })
      );
      
      res.apiSuccess(teams, "Teams fetched successfully", 200);
    } catch (error) {
      console.log(error);
      res.apiError("Internal server error", 500);
    }
 });
 

/**
 * @swagger
 * /api/team/users/{team_id}:
 *   get:
 *     summary: Get all users in a team by team_id
 *     tags: 
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team ID to fetch users
 *         example: 60d6d7f6c905f80012345679
 *     responses:
 *       200:
 *         description: Team information with list of users in the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team:
 *                   description: Team basic information object
 *                   type: object
 *                 members:
 *                   description: Array of user objects who have joined the team
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid team_id
 *       500:
 *         description: Internal server error
 */
router.get("/users/:team_id", auth, async (req, res) => {
  try {
    const { team_id } = req.params;

    // 查找 team 信息
    const team = await Team.findById(team_id);
    if (!team) {
      return res.apiSuccess(null,"Invalid team_id", 400);
    }

    // 查找 team 中的所有用户
    const members = await TeamUser.find({ team_id }).populate('user_id');
    
    // 构建返回的结构，包含 team 信息和成员信息
    const teamInfo = {
      _id: team._id,
      name: team.name,
      loc_id: team.loc_id,
      time: team.time,
      level: team.level,
      total_num: team.total_num,
    };

    const users = members.map(m => ({
      username: m.user_id.username,
      email: m.user_id.email,
    }));

    res.apiSuccess({ team: teamInfo, members: users }, "Members fetched successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/team/create:
 *   post:
 *     summary: Create a new team
 *     tags: 
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team
 *                 example: Running Club
 *               loc_id:
 *                 type: string
 *                 description: The location ID where the team will be created
 *                 example: 60d6d7f6c905f80012345678
 *               time:
 *                 type: string
 *                 description: The time of team activities
 *                 example: "2025-04-01T10:00:00Z"
 *               level:
 *                 type: string
 *                 description: The level of the team
 *                 example: Level_1
 *               image:
 *                 type: string
 *                 description: The URL of the team's image
 *                 example: "http://example.com/team-image.jpg"
 *               total_num:
 *                 type: integer
 *                 description: The maximum number of members allowed in the team
 *                 example: 5
 *     responses:
 *       200:
 *         description: Team created successfully
 *       400:
 *         description: Invalid team data
 *       500:
 *         description: Internal server error
 */
router.post("/create", auth, async (req, res) => {
  try {
    const { name, loc_id, time, level, image, total_num } = req.body;
    const team = new Team({ name, loc_id, time, level, image, total_num});
    await team.save();

    // Create the first user in the team
    const teamUser = new TeamUser({ team_id: team._id, user_id: req.user.userId });
    await teamUser.save();

    res.apiSuccess(team, "Team created successfully", 200);
  } catch (error) {
    console.log(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/team/join/{team_id}:
 *   post:
 *     summary: Join a team
 *     tags: 
 *       - TeamUser
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to join
 *     responses:
 *       200:
 *         description: Successfully joined the team
 *       403:
 *         description: Team is full
 *       409:
 *         description: Already in the team
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.post("/join/:team_id", auth, async (req, res) => {
  try {
    const { team_id } = req.params;
    const user_id = req.user.userId;

    // 查找 team 是否存在
    const team = await Team.findById(team_id);
    if (!team) {
      return res.apiSuccess(null, "Team not found", 404);
    }

    // check if user is already in the team
    const existing = await TeamUser.findOne({ team_id, user_id });
    if (existing) {
      return res.apiSuccess(null,"Already joined this team", 409);
    }

    // check if team is full
    const currentCount = await TeamUser.countDocuments({ team_id });
    if (currentCount >= team.total_num) {
      return res.apiSuccess(null, "Team is full", 403);
    }

    // insert new record
    const newRecord = new TeamUser({ team_id, user_id });
    await newRecord.save();

    res.apiSuccess(null, "Joined team successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});



/**
 * @swagger
 * /api/team/quit/{team_id}:
 *   delete:
 *     summary: Quit a team
 *     tags:
 *       - TeamUser
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the team to quit
 *     responses:
 *       200:
 *         description: Successfully quit the team
 *       400:
 *         description: Invalid team_id
 *       404:
 *         description: User not found in the team
 *       500:
 *         description: Internal server error
 */
router.delete("/quit/:team_id", auth, async (req, res) => {
  try {
    const { team_id } = req.params;
    const user_id = req.user.userId;
    
    // Check if team_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.apiSuccess(null,"Invalid team_id", 400);
    }
    const record = await TeamUser.findOneAndDelete({ team_id, user_id });
    if (!record) {
      return res.apiSuccess(null, "You are not in this team", 404);
    }

    res.apiSuccess(null, "Quit team successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

export default router;


