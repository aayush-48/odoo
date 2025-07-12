import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Register User Controller
const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validate required fields
    if ([fullName, username, email, password].some(field => !field?.trim())) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username: username.toLowerCase() }]
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Handle profileImage upload (optional)
    let profileImageUrl = "";
    const profileImageLocalPath = req.files?.profileImage?.[0]?.path;
    if (profileImageLocalPath) {
      const cloudImage = await uploadOnCloudinary(profileImageLocalPath);
      if (cloudImage?.url) profileImageUrl = cloudImage.url;
    }

    // Create user
    const newUser = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      password,
      profileImage: profileImageUrl
    });

    // Exclude sensitive info
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      profileImage: newUser.profileImage,
      role: newUser.role,
      points: newUser.points,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set cookie with refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        accessToken
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser,registerUser };
