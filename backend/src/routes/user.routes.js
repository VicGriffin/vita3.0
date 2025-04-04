const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/me', authenticate, userController.getCurrentUser);

/**
 * @swagger
 * /api/users/{id}/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/:id/profile', authenticate, userController.getProfile);

/**
 * @swagger
 * /api/users/{id}/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               medicalProfile:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id/profile', authenticate, userController.updateProfile);

/**
 * @swagger
 * /api/users/{id}/settings:
 *   put:
 *     summary: Update user settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notifications:
 *                 type: object
 *               theme:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id/settings', authenticate, userController.updateSettings);

module.exports = router;
