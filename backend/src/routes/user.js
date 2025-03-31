import express from 'express';
import auth from '../middleware/auth.js';
import User from '../data/UserSchema.js';
import jwt from "jsonwebtoken"; 

const JWT_SECRET = "your_secret_key"; 

const router = express.Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: 
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires JWT token for authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique ID of the user
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    res.json(user);    
  }catch(error) {
    res.status(500).json({ error: error.message });
  }
});



/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
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
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h", 
    });
 
    // Response with token
    res.status(200).json({ 
      message: "Login successful", 
      userId: user._id, 
      token 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;