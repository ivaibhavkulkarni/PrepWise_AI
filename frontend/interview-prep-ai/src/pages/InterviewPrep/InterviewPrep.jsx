import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { AnimatePresence, motion } from 'framer-motion'
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
import { toast } from "react-hot-toast"
import DashboardLayout from '../../components/layouts/DashboardLayout'

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {};

  // Generate Concept Explaination
  const generateConceptExplanation = async(question) => {};

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {};

  // Add more questions to a session 
  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if(sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  return (
    <DashboardLayout>
      Interview
    </DashboardLayout>
  )
}

export default InterviewPrep