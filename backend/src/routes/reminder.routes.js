const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');

// Placeholder for reminder controller
const reminderController = {
  getReminders: async (req, res) => {
    res.json({ message: 'Reminders retrieved' });
  },
  createMedicationReminder: async (req, res) => {
    res.json({ message: 'Medication reminder created' });
  },
  createAppointmentReminder: async (req, res) => {
    res.json({ message: 'Appointment reminder created' });
  }
};

router.get('/', authenticate, reminderController.getReminders);
router.post('/medications', authenticate, reminderController.createMedicationReminder);
router.post('/appointments', authenticate, reminderController.createAppointmentReminder);

module.exports = router;
