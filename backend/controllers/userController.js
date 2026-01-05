import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import transporter from '../emailConfig.js';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Respond with user details, including isAdmin
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // Include isAdmin in the response
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with user details, including isAdmin
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // Include isAdmin in the response
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID (Admin)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, isAdmin } = req.body;

  try {
    const user = await User.findById(id);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
  }
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user by ID (Admin)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

let currentOtp; // Store the current OTP temporarily

// Send OTP for forgot password
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate 6-digit OTP
    currentOtp = crypto.randomInt(100000, 999999).toString();

    // Send OTP via email using the pre-configured transporter
    await transporter.sendMail({
      to: email,
      subject: 'OTP for resetting your password.',
      text: `Your OTP is ${currentOtp}`,
    });

    res.json({ message: 'OTP sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending OTP. Please try again later.' });
  }
};

// Verify OTP
export const verifyOtp = (req, res) => {
  const { otp } = req.body;

  if (otp === currentOtp) {
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
};

// Resend OTP for forgot password
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a new OTP
    currentOtp = crypto.randomInt(100000, 999999).toString();

    // Resend OTP via email
    await transporter.sendMail({
      to: email,
      subject: 'OTP for resetting your password.',
      text: `Your OTP is ${currentOtp}`,
    });

    res.json({ message: 'New OTP sent' });
  } catch (error) {
    console.error('Error resending email:', error);
    res.status(500).json({ message: 'Error resending OTP. Please try again later.' });
  }
};

export const sendOrderConfirmation = async (req, res) => {
  const { email, bookingId } = req.body;

  try {
    console.log('Sending confirmation to:', email);  // Debugging line

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);  // Debugging line
      return res.status(404).json({ message: 'User not found' });
    }

    const confirmationMessage = `
      Hello ${user.name},
      Thank you for your booking! Your order has been confirmed.
      Booking ID: ${bookingId}
      Name: ${user.name}
      Email: ${user.email}
      We look forward to serving you!
      Best regards.
    `;

    await transporter.sendMail({
      to: email,
      subject: 'Your Booking Confirmation',
      text: confirmationMessage,
    });

    res.json({ message: 'Order confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    res.status(500).json({ message: 'Error sending order confirmation email. Please try again later.' });
  }
};

