const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};


// @desc Register a new user
// @rote POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const {name, email, password, profileImageUrl } = req.body;

        // check if user already exists 
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User a;ready exists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Return user data with jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({message : "Server error", error: error.message});
    }
};

// @desc Login user
// @rote POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try{
    }catch(error) {
        res.status(500).json({message : "Server error", error: error.message});
    }
};

// @desc Get user Profile
// @rote POST /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) =>{
    try {

    }catch (error){
        res.status(500).json({message : "Server error", error: error.message});
    }
};


module.exports = {registerUser, loginUser, getUserProfile}