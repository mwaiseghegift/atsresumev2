"use client";


import { useState } from 'react';
import { customizeResume } from '../services/customizeService';

export default function JobCustomizer({ resumeData, onCustomized }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobCompany: '',
    jobDescription: '',
    jobRequirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e, saveToDb = false) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await customizeResume({ resumeData, formData, saveToDb });
      if (data.success) {
        setResult(data);
        if (onCustomized) {
          onCustomized(data.customized_data, data.match_score);
        }
      } else {
        throw new Error(data.error || 'Customization failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="exclude-print theme-float-secondary fixed bottom-24 right-8 flex items-center gap-2 px-6 py-3 rounded-full z-40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Customize for Job
      </button>
    );
  }

  return (
    <div className="exclude-print fixed inset-0 bg-[rgba(6,14,18,0.62)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="theme-panel rounded-[1.75rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
        <div className="sticky top-0 bg-[rgba(24,55,68,0.94)] border-b border-[rgba(233,196,106,0.12)] px-6 py-4 flex items-center justify-between backdrop-blur-sm">
          <div>
            <h2 className="theme-heading text-2xl font-bold text-white">Customize Resume for Job</h2>
            <p className="theme-muted-text text-sm mt-1">AI-powered optimization for a specific role and employer.</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="theme-outline-link"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Form */}
          {!result && (
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium theme-accent-text mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Senior Software Engineer"
                  className="theme-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-accent-text mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="jobCompany"
                  value={formData.jobCompany}
                  onChange={handleInputChange}
                  placeholder="e.g., Google"
                  className="theme-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-accent-text mb-2">
                  Job Description *
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Paste the full job description here..."
                  className="theme-input resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-accent-text mb-2">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  name="jobRequirements"
                  value={formData.jobRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any specific skills or qualifications mentioned..."
                  className="theme-input resize-none"
                />
              </div>

              {error && (
                <div className="bg-[rgba(231,111,81,0.12)] border border-[rgba(231,111,81,0.34)] text-[#ffd9d0] px-4 py-3 rounded-lg">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="theme-button-secondary flex-1 disabled:opacity-60 text-white font-medium py-3 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Customizing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview Customization
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={loading}
                  className="theme-button-primary flex-1 disabled:opacity-60 font-medium py-3 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save & Apply
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="bg-[linear-gradient(135deg,rgba(42,157,143,0.18),rgba(233,196,106,0.16),rgba(244,162,97,0.18))] border border-[rgba(233,196,106,0.2)] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Match Score</h3>
                  <span className={`text-3xl font-bold ${
                    result.match_score >= 80 ? 'theme-teal-text' :
                    result.match_score >= 60 ? 'theme-accent-text' :
                    'theme-warm-text'
                  }`}>
                    {result.match_score.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-[rgba(16,34,45,0.6)] rounded-full h-3 overflow-hidden">
                  <div
                    className="theme-score-bar h-full transition-all duration-1000"
                    style={{ width: `${result.match_score}%` }}
                  />
                </div>
              </div>

              <div className="theme-panel-soft rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 theme-accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Customization Notes
                </h3>
                <div className="prose prose-sm max-w-none text-[rgba(248,243,231,0.78)] whitespace-pre-wrap">
                  {result.customization_notes}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setResult(null);
                    setFormData({
                      jobTitle: '',
                      jobCompany: '',
                      jobDescription: '',
                      jobRequirements: ''
                    });
                  }}
                  className="theme-button-soft flex-1 font-medium py-3"
                >
                  Try Another Job
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="theme-button-primary flex-1 font-medium py-3"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
