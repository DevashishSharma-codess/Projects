const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;
    console.log('[AUTH] Register attempt:', { username, email });

    console.log('[AUTH] Checking if user already exists...');
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      console.log('[AUTH] User already exists');
      return res.status(409).json({
        message: "User already exists",
      });
    }

    console.log('[AUTH] Hashing password...');
    const hashed = await bcrypt.hash(password, 10);

    console.log('[AUTH] Creating user in database...');
    const user = await userModel.create({
      username,
      email,
      password: hashed,
      role,
    });

    console.log('[AUTH] User created, generating token...');
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    console.log('[AUTH] ✓ Registration successful for:', user.username);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[AUTH] ✗ Registration error:', error.message);
    console.error('[AUTH] Full error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log('[AUTH] Login attempt:', { username, email: email || 'N/A' });

    console.log('[AUTH] Searching for user in database...');
    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      console.log('[AUTH] User not found');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('[AUTH] User found:', user.username);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('[AUTH] Invalid password');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('[AUTH] Password valid, generating token...');
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    console.log('[AUTH] ✓ Login successful for:', user.username);

    res.status(200).json({
      message: "User Login successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[AUTH] ✗ Login error:', error.message);
    console.error('[AUTH] Full error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getMe(req, res) {
  try {
    console.log('[AUTH] GetMe request received');
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      console.log('[AUTH] No token provided');
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log('[AUTH] Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH] Token decoded, fetching user...');
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      console.log('[AUTH] User not found');
      return res.status(404).json({ message: "User not found" });
    }

    console.log('[AUTH] ✓ GetMe successful for:', user.username);
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('[AUTH] ✗ GetMe error:', err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function logoutUser(req, res) {
  try {
    console.log('[AUTH] Logout request received');
    res.clearCookie("token");
    console.log('[AUTH] ✓ Logout successful');
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error('[AUTH] ✗ Logout error:', err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};

