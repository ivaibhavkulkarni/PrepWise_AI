export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Signup
        LOGIN: "/api/auth/login", // Authentication user & return JWT token
        GET_PROFILE: "/api/auth/profile",
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",
    },

    SESSION: {
        CREATE: "/api/sessions/create",
        GET_ALL: "/api/sessions/my-sessions",
        GET_ONE: (id) => `/api/session/${id}`,
        DELETE: (id) => `/api/session/${id}`,
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",
        PIN: (id) => `/api/questions/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
    },

};