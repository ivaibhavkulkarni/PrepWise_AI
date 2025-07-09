import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching session data:', error);
      setError('Failed to load sessions. Please try again.');
      toast.error('Failed to load sessions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      setSessions(sessions.filter((session) => session._id !== sessionData._id));
      toast.success('Session deleted successfully');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session. Please try again.');
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        {loading && <p className="text-center text-gray-600">Loading sessions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && sessions.length === 0 && (
          <p className="text-center text-gray-600">No sessions found. Create a new one!</p>
        )}
        {!loading && sessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {sessions.map((data, index) => (
              <SummaryCard
                key={data._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data.role || ''}
                topicsToFocus={data.topicsToFocus || ''}
                experience={data.experience || '-'}
                questions={data.questions?.length || 0}
                description={data.description || ''}
                lastUpdated={
                  data.updatedAt
                    ? moment(data.updatedAt).format('Do MMMM YYYY')
                    : ''
                }
                onSelect={() => navigate(`/interview-prep/${data._id}`)}
                onDelete={() =>
                  setOpenDeleteAlert({ open: true, data })
                }
              />
            ))}
          </div>
        )}
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() =>{
          setOpenCreateModal(false)
        }}
        HideHeader
      >
        <div>
          <CreateSessionForm />
        </div>

      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;