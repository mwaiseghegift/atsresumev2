"use client";


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchResumes, fetchCustomizedResumes } from '../../services/resumeService';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('default'); // 'default' or 'custom'
  const [resumes, setResumes] = useState([]);
  const [customResumes, setCustomResumes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [resumesData, customResumesData] = await Promise.all([
        fetchResumes(),
        fetchCustomizedResumes()
      ]);
      setResumes(resumesData);
      setCustomResumes(customResumesData);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            My Dashboard
          </h1>
          <p className="mt-2 text-slate-400">Manage your default CVs and customized applications.</p>
        </div>

        <div className="flex space-x-4 border-b border-slate-700 pb-2">
          <button
            onClick={() => setActiveTab('default')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'default' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Default CVs
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'custom' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Customized Applications
          </button>
        </div>

        {dataLoading ? (
          <div className="text-slate-400 py-8 animate-pulse text-lg">Loading your data...</div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            {activeTab === 'default' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <h2 className="text-xl font-semibold">Saved Default CVs</h2>
                  <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/25">
                    Create New CV
                  </Link>
                </div>
                {resumes.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/50 rounded-lg border border-dashed border-slate-700">
                     <p className="text-slate-400 mb-4">No default CVs found. Create one from the builder!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map(resume => (
                      <div key={resume.id} className="bg-slate-900 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-all shadow-md group">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-medium text-lg text-slate-200">Resume #{resume.id}</h3>
                           <span className="bg-blue-900/50 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-800">Master</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center group-hover:border-slate-600 transition-colors">
                            <span className="text-xs text-slate-500">Data Format: JSON</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-slate-700 pb-4">Job Applications & Custom CVs</h2>
                {customResumes.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/50 rounded-lg border border-dashed border-slate-700">
                    <p className="text-slate-400">No customized CVs found. Use the Job Customizer on the home page to create one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customResumes.map(custom => {
                      // Handle potential missing job_description relations safely based on serializer output
                      const jobTitle = custom.job_description_details?.title || 'Target Role';
                      const jobCompany = custom.job_description_details?.company || 'Company';
                      return (
                      <div key={custom.id} className="bg-slate-900 border border-slate-700 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500/50 transition-all shadow-md">
                        <div>
                          <h3 className="font-medium text-lg text-slate-200 flex items-center gap-2">
                            {jobTitle}
                            {jobCompany && <span className="text-sm text-slate-400">@ {jobCompany}</span>}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">Application Date: {new Date(custom.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-slate-800 md:border-0">
                          <div className="text-center">
                            <span className="block text-xs text-slate-400 mb-1">Match Score</span>
                            <span className={`font-bold text-lg ${
                              custom.match_score >= 80 ? 'text-green-500' :
                              custom.match_score >= 60 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>{custom.match_score ? custom.match_score.toFixed(1) : 'N/A'}%</span>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
