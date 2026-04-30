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
    return <div className="min-h-screen theme-auth-shell flex items-center justify-center text-white font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen theme-auth-shell py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <p className="theme-kicker">Workspace</p>
          <h1 className="theme-heading text-4xl font-bold theme-brand-text inline-block">
            My Dashboard
          </h1>
          <p className="mt-2 theme-muted-text">Manage your default CVs and customized applications.</p>
        </div>

        <div className="flex space-x-4 border-b border-[rgba(233,196,106,0.12)] pb-2">
          <button
            onClick={() => setActiveTab('default')}
            className={`theme-tab px-4 py-2 font-medium rounded-t-xl ${activeTab === 'default' ? 'theme-tab-active' : 'hover:text-white'}`}
          >
            Default CVs
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`theme-tab px-4 py-2 font-medium rounded-t-xl ${activeTab === 'custom' ? 'theme-tab-active' : 'hover:text-white'}`}
          >
            Customized Applications
          </button>
        </div>

        {dataLoading ? (
          <div className="theme-muted-text py-8 animate-pulse text-lg">Loading your data...</div>
        ) : (
          <div className="theme-panel rounded-[1.75rem] p-6">
            {activeTab === 'default' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[rgba(233,196,106,0.12)] pb-4">
                  <h2 className="text-xl font-semibold">Saved Default CVs</h2>
                  <Link href="/" className="theme-button-primary px-4 py-2 text-sm font-medium">
                    Create New CV
                  </Link>
                </div>
                {resumes.length === 0 ? (
                  <div className="text-center py-10 bg-[rgba(16,34,45,0.5)] rounded-2xl border border-dashed border-[rgba(233,196,106,0.16)]">
                     <p className="theme-muted-text mb-4">No default CVs found. Create one from the builder!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map(resume => (
                      <div key={resume.id} className="theme-panel-soft rounded-2xl p-5 hover:border-[rgba(233,196,106,0.34)] transition-all shadow-md group">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-medium text-lg text-white">Resume #{resume.id}</h3>
                           <span className="theme-chip text-xs px-2 py-1 rounded-full">Master</span>
                        </div>
                        <p className="text-sm theme-muted-text mt-2">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                        <div className="mt-4 pt-4 border-t border-[rgba(233,196,106,0.08)] flex justify-between items-center transition-colors">
                            <span className="text-xs theme-muted-text">Data Format: JSON</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'custom' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-[rgba(233,196,106,0.12)] pb-4">Job Applications & Custom CVs</h2>
                {customResumes.length === 0 ? (
                  <div className="text-center py-10 bg-[rgba(16,34,45,0.5)] rounded-2xl border border-dashed border-[rgba(233,196,106,0.16)]">
                    <p className="theme-muted-text">No customized CVs found. Use the Job Customizer on the home page to create one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customResumes.map(custom => {
                      // Handle potential missing job_description relations safely based on serializer output
                      const jobTitle = custom.job_description_details?.title || 'Target Role';
                      const jobCompany = custom.job_description_details?.company || 'Company';
                      return (
                      <div key={custom.id} className="theme-panel-soft rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[rgba(42,157,143,0.36)] transition-all shadow-md">
                        <div>
                          <h3 className="font-medium text-lg text-white flex items-center gap-2">
                            {jobTitle}
                            {jobCompany && <span className="text-sm theme-muted-text">@ {jobCompany}</span>}
                          </h3>
                          <p className="text-sm theme-muted-text mt-1">Application Date: {new Date(custom.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[rgba(233,196,106,0.08)] md:border-0">
                          <div className="text-center">
                            <span className="block text-xs theme-muted-text mb-1">Match Score</span>
                            <span className={`font-bold text-lg ${
                              custom.match_score >= 80 ? 'theme-teal-text' :
                              custom.match_score >= 60 ? 'theme-accent-text' :
                              'theme-warm-text'
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
