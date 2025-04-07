const axios = require('axios');
const { EmergencyRequest } = require('../models');

const PYTHON_API_URL = 'http://localhost:5000/api/analyze-emergency';


class EmergencyService {
    static async createEmergencyRequest(userId, type, location, description) {
        try {
            // First, create the emergency request
            const request = await EmergencyRequest.create({
                userId,
                type,
                location,
                description,
                status: 'pending'
            });

            // Get recommendation from Python model
            const modelResponse = await axios.post(PYTHON_API_URL, {
                description: description
            });

            // Update the request with the recommendation
            await request.update({
                recommendation: modelResponse.data
            });

            return request;
        } catch (error) {
            console.error('Error in emergency request creation:', error);
            throw error;
        }
    }

    static async getEmergencyRequest(requestId) {
        return EmergencyRequest.findByPk(requestId);
    }

    static async updateEmergencyStatus(requestId, status) {
        const request = await EmergencyRequest.findByPk(requestId);
        if (!request) {
            throw new Error('Emergency request not found');
        }
        return request.update({ status });
    }
}

// Create a new emergency request
const request = await EmergencyService.createEmergencyRequest(
    userId,
    'medical',
    { lat: 123, lng: 456 },
    'Patient experiencing severe chest pain'
);

// The request will automatically include AI recommendations
console.log(request.recommendation);

module.exports = EmergencyService;
