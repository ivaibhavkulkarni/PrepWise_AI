import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion, number } from 'framer-motion';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loaders/SkeletonLoader';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false); // ADDED
  const [explanation, setExplanation] = useState(null);

  const fetchSessionDetailsById = async () => {
    setIsLoading(true);
    setErrorMsg('');
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
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg('');
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg('Failed to generate explanation. Try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      if (response.data && response.data.question) {
        const updatedQuestion = response.data.question;

        setSessionData((prev) => {
          let updatedQuestions;

          if (updatedQuestion.isPinned) {
            updatedQuestions = [
              updatedQuestion,
              ...prev.questions.filter((q) => q._id !== updatedQuestion._id),
            ];
          } else {
            updatedQuestions = [
              ...prev.questions.filter((q) => q._id !== updatedQuestion._id),
              updatedQuestion,
            ];
          }

          return {
            ...prev,
            questions: updatedQuestions,
          };
        });
      }
    } catch (error) {
      console.error('Error pinning/unpinning:', error);
    }
  };

  //Load More Questions
const uploadMoreQuestions = async () => {
  setIsUpdateLoader(true);
  try {
    const aiResponse = await axiosInstance.post(
      API_PATHS.AI.GENERATE_QUESTIONS,
      {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      }
    );

    let generatedQuestions = aiResponse.data;

    // Normalize: convert array of strings to array of objects
    if (Array.isArray(generatedQuestions) && typeof generatedQuestions[0] === 'string') {
      generatedQuestions = generatedQuestions.map((q) => ({
        question: q,
        answer: '', // or generate answer if required
      }));
    }

    console.log("Formatted Questions:", generatedQuestions);

    const response = await axiosInstance.post(
      API_PATHS.QUESTION.ADD_TO_SESSION,
      {
        sessionId,
        questions: generatedQuestions,
      }
    );

    if (response.data) {
      toast.success("Added More Q&A!!");
      fetchSessionDetailsById();
    }
  } catch (error) {
    console.error("Upload questions error:", error);

    if (error.response && error.response.data.message) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg("Something went wrong. Please try again.");
    }
  } finally {
    setIsUpdateLoader(false);
  }
};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
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

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 lg:pl-4">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        {isLoading && !openLearnMoreDrawer && <SpinnerLoader />}

        {errorMsg && !openLearnMoreDrawer && (
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
              openLearnMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions
                ?.slice()
                ?.sort((a, b) => {
                  if (a.isPinned && b.isPinned) {
                    return new Date(b.pinnedAt) - new Date(a.pinnedAt);
                  }
                  if (a.isPinned) return -1;
                  if (b.isPinned) return 1;
                  return 0;
                })
                ?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 100,
                      delay: index * 0.05,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>

            
            {!isLoading && sessionData?.questions?.length > 0 && (
              <div className="flex items-center justify-center mt-5">
                <button
                  className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                  disabled={isLoading || isUpdateLoader}
                  onClick={uploadMoreQuestions}
                >
                  {isUpdateLoader ? (
                    <SpinnerLoader />
                  ) : (
                    <LuListCollapse className="text-lg" />
                  )}
                  {' '}Load More
                </button>
              </div>
            )}
          </div>
        </div>

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={explanation?.title || 'Learn More'}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
