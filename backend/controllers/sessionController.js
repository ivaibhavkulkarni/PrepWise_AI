const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc Create a new session and Linked questions
// @routes POST /api/sessions/create
// @access Private 

exports.createSession = async (req,res) => {
    try {
        const {role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id
            })
        );

        session.questions = questionDocs;
        await session.save();
        res.status(201).json({ success: true, session});

    }catch (error){
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

// @desc Get all session for the logged-in user
// @routes GET /api/sessions/my-sessions
// @access Private 

exports.getMySession = async (req,res) => {
    try {

    }catch (error){
        res.status(500).json({ success: false, message: "Server Error"})
    }
};

// @desc Get a session by ID with populated questions
// @routes GET /api/sessions/:id
// @access Private 
exports.getSessionById = async (req,res) => {
    try {

    }catch (error){
        res.status(500).json({ success: false, message: "Server Error"})
    }
};


// @desc Delete a session and its questions 
// @routes Delete /api/sessions/:id
// @access Private 
exports.deleteSession = async (req,res) => {
    try {

    }catch (error){
        res.status(500).json({ success: false, message: "Server Error"})
    }
};