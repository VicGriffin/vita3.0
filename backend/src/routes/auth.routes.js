const express = require('express');
const authController = require('../controllers/auth.controller');
const { validateClerkWebhook } = require('../middleware/clerk.middleware');
const router = express.Router();

/**
 * @swagger
 * /api/auth/webhook:
 *   post:
 *     summary: Handle Clerk webhooks
 *     tags: [Auth]
 *     description: Endpoint for processing Clerk user events (created, updated, deleted)
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       401:
 *         description: Invalid webhook signature
 */
router.post('/webhook', validateClerkWebhook, authController.handleWebhook);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authController.getProfile);

module.exports = router;
