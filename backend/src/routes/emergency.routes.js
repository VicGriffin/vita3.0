const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');

// Placeholder for emergency controller
const emergencyController = {
  requestAssistance: async (req, res) => {
    res.json({ message: 'Emergency assistance requested' });
  },
  getNearbyLocations: async (req, res) => {
    res.json({ message: 'Nearby locations retrieved' });
  }
};

router.post('/assist', authenticate, emergencyController.requestAssistance);
router.get('/locations', authenticate, emergencyController.getNearbyLocations);

module.exports = router;
