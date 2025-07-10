import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    setIsLoading(true); // Set loading state to true
    setErrorMsg(''); // Clear previous errors
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      } else {
        setErrorMsg('No session data found.');
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setErrorMsg('Failed to load session data. Please try again.');
      toast.error('Failed to load session data.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Generate Concept Explanation (placeholder)
  const generateConceptExplanation = async (question) => {
    // Implement API call or logic to generate explanation
    console.log('Generating explanation for:', question);
  };

  // Pin Question (placeholder)
  const toggleQuestionPinStatus = async (questionId) => {
    // Implement API call to toggle pin status
    console.log('Toggling pin for question:', questionId);
  };

  // Add more questions to a session (placeholder)
  const uploadMoreQuestions = async () => {
    // Implement API call to upload more questions
    console.log('Uploading more questions');
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    // Cleanup (optional)
    return () => {
      // Any cleanup logic if needed
    };
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ''}
        topicsToFocus={sessionData?.topicsToFocus || ''}
        experience={sessionData?.experience || '-'}
        questions={sessionData?.questions?.length || '-'}
        description={sessionData?.description || ''}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format('Do MMMM YYYY')
            : ''
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        {isLoading && <SpinnerLoader />} {/* Show loader while fetching */}
        {errorMsg && (
          <div className="text-red-500 flex items-center gap-2 mt-4">
            <LuCircleAlert /> {errorMsg}
          </div>
        )}
        {!isLoading && !errorMsg && sessionData?.questions?.length === 0 && (
          <div className="text-gray-500 mt-4">No questions available for this session.</div>
        )}

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() => generateConceptExplanation(data.question)}
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;