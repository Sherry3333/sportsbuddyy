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
 * /api/location/create:
 *   post:
 *     summary: Add a new location
 *     tags:
 *       - Location
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
 *                 example: Auckland Central Park
 *               sports_id:
 *                 type: string
 *                 example: 661c0a3e72d5be34b22297fa
 *     responses:
 *       200:
 *         description: Location added successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", auth, async (req, res) => {
  try {
    const { name, sports_id } = req.body;
    const location = new Location({ name, sports_id });
    await location.save();
    res.apiSuccess(location, "Location added successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

export default router;


