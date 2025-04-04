const { User, MedicalProfile } = require('../models');
const ApiResponse = require('../utils/apiResponse');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: [{ model: MedicalProfile }],
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    return ApiResponse.success(res, { user });
  } catch (error) {
    console.error('Get profile error:', error);
    return ApiResponse.error(res, 'Error fetching user profile');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, medicalProfile } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    // Update user basic info
    await user.update({ name, email });

    // Update or create medical profile
    if (medicalProfile) {
      await MedicalProfile.upsert({
        ...medicalProfile,
        userId,
      });
    }

    // Fetch updated user with medical profile
    const updatedUser = await User.findByPk(userId, {
      include: [{ model: MedicalProfile }],
      attributes: { exclude: ['password'] },
    });

    return ApiResponse.success(res, { user: updatedUser }, 'Profile updated successfully');
  } catch (error) {
    console.error('Update profile error:', error);
    return ApiResponse.error(res, 'Error updating user profile');
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const userId = req.params.id;
    const { notifications, theme, language } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    // Update user settings
    await user.update({
      settings: {
        notifications,
        theme,
        language,
      },
    });

    return ApiResponse.success(res, { settings: user.settings }, 'Settings updated successfully');
  } catch (error) {
    console.error('Update settings error:', error);
    return ApiResponse.error(res, 'Error updating user settings');
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    return ApiResponse.success(res, { user }, 'User retrieved successfully');
  } catch (error) {
    console.error('Get current user error:', error);
    return ApiResponse.error(res, 'Error retrieving user');
  }
};
