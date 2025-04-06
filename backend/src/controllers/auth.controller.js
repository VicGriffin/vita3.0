const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiResponse = require('../utils/apiResponse');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, 'Email already exists', 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'patient',
    });

    const token = generateToken(user);

    return ApiResponse.success(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }, 'User created successfully', 201);
  } catch (error) {
    console.error('Signup error:', error);
    return ApiResponse.error(res, 'Error creating user');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return ApiResponse.unauthorized(res, 'Invalid credentials');
    }

    try {
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return ApiResponse.unauthorized(res, 'Invalid credentials');
      }
    } catch (error) {
      console.error('Password validation error:', error);
      return ApiResponse.error(res, 'Error validating password');
    }

    await user.update({ lastLogin: new Date() });

    const token = generateToken(user);

    return ApiResponse.success(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return ApiResponse.error(res, 'Error during login');
  }
};

exports.logout = (req, res) => {
  return ApiResponse.success(res, null, 'Logged out successfully');
};
