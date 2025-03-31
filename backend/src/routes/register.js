import express from "express";
import User from "../data/UserSchema.js";
const router = express.Router();


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - User  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: 123456
 *               gender:    
 *                 type: string
 *                 description: The gender of the user
 *                 example: male
 *               sports:
 *                 type: string
 *                 description: The sports of the user
 *                 example: running
 *               level:
 *                 type: string
 *                 description: The level of the user
 *                 example: Level_1
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: test@gmail.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", async (req, res) => {
   try {
     const { username, password, gender, sports, level, email } = req.body;

     // check if username already exists
     const existingUser = await User.findOne({ username });
     if (existingUser) {
       return res.status(400).json({ message: "Username already exists" });
     }

     // create new user 
     const user = new User({ username, password, gender, sports, level, email });
     await user.save();

     res.status(201).json({ message: "user created successfully" });
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Internal server error" });
   }
});



export default router;