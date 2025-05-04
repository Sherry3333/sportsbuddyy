import express from "express";
import auth from "../middleware/auth.js";
import User from "../data/UserSchema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Retrieve a specific user from the database using their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                   example: johndoe
 *       404:
 *         description: User not found.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
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
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.apiSuccess(null, "Invalid username or password", 400);
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Response with token
    res.apiSuccess(token, "Login successful", 200);
  } catch (error) {
    console.log(error);
    res.apiError("Internal server error", 500);
  }
});

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
 *       200:
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
      return res.apiSuccess(null, "Username already exists", 400);
    }

    // create new user
    const user = new User({ username, password, gender, sports, level, email });
    await user.save();

    res.apiSuccess(null, "user created successfully", 200);
  } catch (error) {
    console.log(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: 
 *       - User  
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.post("/logout", async (req, res) => {
  try {
    res.apiSuccess(null, "Logout successful", 200);
  } catch (error) {
    res.apiError("Internal server error", 500);
  }
});
export default router;
