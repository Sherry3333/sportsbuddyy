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

/**
 * @swagger
 * /api/sport/list:
 *   get:
 *     summary: Get all sports
 *     tags:
 *       - Sport
 *     responses:
 *       200:
 *         description: List of sports
 *       500:
 *         description: Internal server error
 */
router.get("/list", async (req, res) => {
  try {
    const sports = await Sport.find(); // 从数据库获取所有运动
    res.apiSuccess(sports, "Sports fetched successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/sport/{id}:
 *   get:
 *     summary: Get sport details
 *     tags:
 *       - Sport
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sport ID
 *     responses:
 *       200:
 *         description: Sport details
 *       404:
 *         description: Sport not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sport = await Sport.findById(id);
    if (!sport) {
      return res.apiError("Sport not found", 404);
    }
    res.apiSuccess(sport, "Sport details fetched successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/sport/update/{id}:
 *   put:
 *     summary: Update sport information
 *     tags:
 *       - Sport
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sport ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Football
 *               info:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Sport updated successfully
 *       404:
 *         description: Sport not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, info } = req.body;
    const sport = await Sport.findByIdAndUpdate(id, { name, info }, { new: true });
    if (!sport) {
      return res.apiError("Sport not found", 404);
    }
    res.apiSuccess(sport, "Sport updated successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

/**
 * @swagger
 * /api/sport/delete/{id}:
 *   delete:
 *     summary: Delete a sport
 *     tags:
 *       - Sport
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sport ID
 *     responses:
 *       200:
 *         description: Sport deleted successfully
 *       404:
 *         description: Sport not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const sport = await Sport.findByIdAndDelete(id);
    if (!sport) {
      return res.apiError("Sport not found", 404);
    }
    res.apiSuccess(null, "Sport deleted successfully", 200);
  } catch (error) {
    console.error(error);
    res.apiError("Internal server error", 500);
  }
});

export default router;


