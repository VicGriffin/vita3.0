const { Clerk, WebhookEvent } = require('@clerk/clerk-sdk-node');
const ApiResponse = require('../utils/apiResponse');

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const validateClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    // Verify the Clerk session token
    const session = await clerk.sessions.verifySession(token);
    if (!session || !session.userId) {
      return ApiResponse.unauthorized(res, 'Invalid or expired token');
    }

    // Get user details from Clerk
    const user = await clerk.users.getUser(session.userId);
    if (!user) {
      return ApiResponse.unauthorized(res, 'User not found');
    }

    req.user = {
      id: user.id,
      email: user.emailAddresses?.[0]?.emailAddress || '',
      firstName: user.firstName,
      lastName: user.lastName,
      clerkId: user.id,
    };

    next();
  } catch (error) {
    console.error('Clerk auth error:', error.message);
    return ApiResponse.unauthorized(res, 'Authentication failed');
  }
};

const validateClerkWebhook = async (req, res, next) => {
  try {
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return ApiResponse.unauthorized(res, 'Missing webhook signature headers');
    }

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET is not set');
      return ApiResponse.error(res, 'Server configuration error', 500);
    }

    const wh = new WebhookEvent({
      payload: req.body,
      headers: {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      },
      webhookSecret,
    });

    req.body = wh.payload;
    next();
  } catch (error) {
    console.error('Webhook validation error:', error.message);
    return ApiResponse.unauthorized(res, 'Invalid webhook signature');
  }
};

module.exports = { validateClerkToken, validateClerkWebhook };
