import express from "express";
import jwt from "jsonwebtoken"; // 引入jsonwebtoken库
import User from "../data/UserSchema.js";

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // 替换为更安全的密钥

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
      expiresIn: "1h", // Token有效期为1小时
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