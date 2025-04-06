const { User } = require('../models');
const ApiResponse = require('../utils/apiResponse');

exports.handleWebhook = async (req, res) => {
  const { type, data } = req.body;

  try {
    switch (type) {
      case 'user.created':
        await User.create({
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: data.email_addresses[0]?.email_address,
          clerkId: data.id,
          role: 'patient', // Default role
        });
        break;

      case 'user.updated':
        await User.update(
          {
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            email: data.email_addresses[0]?.email_address,
          },
          { where: { clerkId: data.id } }
        );
        break;

      case 'user.deleted':
        await User.destroy({ where: { clerkId: data.id } });
        break;

      default:
        // Ignore other webhook types
        break;
    }

    return ApiResponse.success(res, null, 'Webhook processed successfully');
  } catch (error) {
    console.error('Webhook error:', error);
    return ApiResponse.error(res, 'Error processing webhook');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { clerkId: req.user.clerkId } });
    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    return ApiResponse.success(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return ApiResponse.error(res, 'Error retrieving user profile');
  }
};
