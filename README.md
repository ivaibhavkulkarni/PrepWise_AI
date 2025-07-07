# PrepWise AI
- PrepWise AI is an AI-powered interview preparation platform designed to help developers ace technical interviews. It provides personalized interview questions, detailed explanations, and a customizable learning experience tailored to your role, experience level, and preferred tech stack.

# Features
- Personalized Questions: Generate role-specific interview questions based on your experience and focus topics using Google's Gemini AI.
- In-Depth Explanations: Dive deeper into concepts with beginner-friendly explanations powered by AI.
- Session Management: Save, organize, and revisit your interview preparation sessions.
- Note-Taking: Add notes to questions and pin important ones for quick access.
- User Authentication: Secure user registration and login with JWT-based authentication.
- Profile Customization: Upload profile images and manage user profiles.
- Responsive UI: A modern, responsive front-end built with React and Tailwind CSS.

# Tech Stack
## Backend
- Node.js & Express: RESTful API for handling requests and business logic.
- MongoDB & Mongoose: Database for storing user, session, and question data.
- Google Gemini AI: For generating interview questions and explanations.
- JWT & bcryptjs: For secure authentication and password hashing.
- Multer: For handling file uploads (profile images).
- CORS & dotenv: For cross-origin requests and environment variable management.

## Frontend

- React & Vite: Fast, modern front-end framework with hot module replacement.
- Tailwind CSS: Utility-first CSS framework for styling.
- React Router: For client-side routing.
- Axios: For making API requests.
- Framer Motion: For animations.
- React Markdown & Syntax Highlighter: For rendering markdown and code snippets.
- React Hot Toast: For user notifications.

# Installation
## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

## Backend Setup

- Navigate to the backend directory:cd backend


- Install dependencies:npm install


- Create a .env file in the backend directory with the following:PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- GEMINI_API_KEY=your_google_gemini_api_key


- Start the backend server:npm start

- Or, for development with auto-reload:npm run dev



## Frontend Setup

- Navigate to the frontend/interview-prep-ai directory:cd frontend/interview-prep-ai


- Install dependencies:npm install


- Update the BASE_URL in src/utils/apiPaths.js to match your backend server (default: http://localhost:5000).
- Start the frontend development server:npm run dev



## Running the Application

- Ensure MongoDB is running.
- Start the backend server (npm start in backend).
- Start the frontend server (npm run dev in frontend/interview-prep-ai).
- Open http://localhost:5173 in your browser (or the port shown by Vite).

## Usage

- Sign Up / Login: Create an account or log in via the landing page modal.
- Dashboard: View and manage your interview preparation sessions.
- Interview Prep: Access role-specific questions, add notes, pin questions, and request AI-generated explanations.
- Profile: Upload a profile picture and view your user details.
- Sessions: Create, view, and delete sessions with linked questions.

## API Endpoints

## Auth:
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in and receive a JWT token.
- GET /api/auth/profile: Get user profile (protected).
- POST /api/auth/upload-image: Upload a profile image.


## AI:
- POST /api/ai/generate-questions: Generate interview questions (protected).
- POST /api/ai/generate-explanation: Generate concept explanations (protected).


## Sessions:
- POST /api/sessions/create: Create a new session (protected).
- GET /api/sessions/my-sessions: Get all user sessions (protected).
- GET /api/sessions/:id: Get a session by ID (protected).
- DELETE /api/sessions/:id: Delete a session (protected).


## Questions:
- POST /api/questions/add: Add questions to a session (protected).
- POST /api/questions/:id/pin: Pin/unpin a question (protected).
- POST /api/questions/:id/note: Update a question's note (protected).



# Contributing
- Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Acknowledgements

Built with ❤️ by Vaibhav Kulkarni.
Powered by Google Gemini AI for intelligent question generation and explanations.
Styled with Tailwind CSS for a modern, responsive UI.
