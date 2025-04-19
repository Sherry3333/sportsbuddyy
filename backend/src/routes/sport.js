import express from 'express';
import auth from '../middleware/auth.js';
import Sport from '../data/SportSchema.js';
import mongoose from "mongoose";

const router = express.Router();

/**
 * @swagger
 * /api/sport/create:
 *   post:
 *     summary: Add a new sport
 *     tags:
 *       - Sport
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
 *                 example: Football
 *               info:
 *                 type: string
 *                 example: A team sport played with a ball
 *     responses:
 *       200:
 *         description: Sport added successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", auth, async (req, res) => {
  try {
    const { name, info } = req.body;
    const sport = new Sport({ name, info });
    await sport.save();
    res.apiSuccess(sport, "Sport added successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

export default router;


