"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetchJobDescriptions, createJobDescription, updateJobDescription, deleteJobDescription } from '../../../services/jobDescriptionService';
import { fetchCustomizedResumes } from '../../../services/resumeService';
import Sidebar from '../../../components/dashboard/Sidebar';
import TopBar from '../../../components/dashboard/TopBar';
import { IcoPlus, IcoSpinner, IcoTrash, IcoExternalLink, IcoClose, IcoBriefcase, IcoStar, IcoEdit, IcoNote } from '../../../components/dashboard/icons';
import { JOB_STATUSES, getStatusMeta } from '../../../constants/jobStatus';

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SortIcon({ active, dir }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity: active ? 1 : 0, color: '#0D9488', transform: dir === 'asc' ? 'rotate(180deg)' : 'none', transition: 'opacity 120ms ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SortableTh({ label, sortKey, sort, onSort }) {
  const active = sort.key === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-600 transition-colors whitespace-nowrap"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon active={active} dir={active ? sort.dir : 'asc'} />
      </span>
    </th>
  );
}

function JobFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    company: initial?.company || '',
    job_url: initial?.job_url || '',
    status: initial?.status || 'saved',
    applied_date: initial?.applied_date || '',
    interview_date: initial?.interview_date || '',
    notes: initial?.notes || '',
    description: initial?.description || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Job title is required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({
        ...form,
        applied_date: form.applied_date || null,
        interview_date: form.interview_date || null,
      });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setSaving(false);
    }
  };

  return (
    <div
      className="exclude-print fixed inset-0 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[88vh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">{initial ? 'Edit tracked job' : 'Track a job'}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <IcoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Job title *</label>
              <input
                value={form.title}
                onChange={set('title')}
                required
                autoFocus
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Company</label>
              <input
                value={form.company}
                onChange={set('company')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={set('status')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              >
                {JOB_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Job posting URL</label>
            <input
              type="url"
              value={form.job_url}
              onChange={set('job_url')}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Applied date</label>
              <input
                type="date"
                value={form.applied_date}
                onChange={set('applied_date')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Interview date</label>
              <input
                type="date"
                value={form.interview_date}
                onChange={set('interview_date')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={set('notes')}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
              placeholder="Recruiter contact, referral, salary range..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Job description (optional)</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
              placeholder="Paste the posting text here if you want it saved for reference."
            />
          </div>

          {error && (
            <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-sm font-semibold text-white rounded-xl disabled:opacity-60 transition-all"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
            >
              {saving ? 'Saving…' : initial ? 'Save changes' : 'Track job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function JobTrackerPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [customResumes, setCustomResumes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalJob, setModalJob] = useState(null); // null = closed, {} = new, {...job} = editing
  const [deleteState, setDeleteState] = useState({});
  const [sort, setSort] = useState({ key: 'created_at', dir: 'desc' });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setDataLoading(true);
      try {
        const [j, c] = await Promise.all([fetchJobDescriptions(), fetchCustomizedResumes()]);
        setJobs(j);
        setCustomResumes(c);
      } catch { /* silently fail */ }
      finally { setDataLoading(false); }
    })();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleSave = async (form) => {
    if (modalJob?.id) {
      const updated = await updateJobDescription(modalJob.id, form);
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    } else {
      const created = await createJobDescription(form);
      setJobs((prev) => [created, ...prev]);
    }
    setModalJob(null);
  };

  const handleStatusChange = async (job, status) => {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status } : j))); // optimistic
    try {
      await updateJobDescription(job.id, { status });
    } catch {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j))); // revert on failure
    }
  };

  const handleDelete = async (id) => {
    setDeleteState((s) => ({ ...s, [id]: 'deleting' }));
    try {
      await deleteJobDescription(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch {
      setDeleteState((s) => ({ ...s, [id]: 'idle' }));
    }
  };

  const statusCounts = useMemo(() => jobs.reduce((acc, j) => {
    acc[j.status] = (acc[j.status] || 0) + 1;
    return acc;
  }, {}), [jobs]);

  const filteredJobs = activeFilter === 'all' ? jobs : jobs.filter((j) => j.status === activeFilter);

  const sortedJobs = useMemo(() => {
    const arr = [...filteredJobs];
    arr.sort((a, b) => {
      let av = a[sort.key];
      let bv = b[sort.key];
      if (av == null) av = '';
      if (bv == null) bv = '';
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredJobs, sort]);

  const toggleSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  const resumesForJob = (jobId) => customResumes.filter((c) => c.job_description?.id === jobId);

  if (loading || !user) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <IcoSpinner /><span className="text-sm font-medium">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar user={user} />

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-6xl mx-auto space-y-5">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{ letterSpacing: '-0.025em' }}>Job Tracker</h1>
                <p className="text-sm text-gray-400 mt-0.5">Track every application from saved to offer.</p>
              </div>
              <button
                onClick={() => setModalJob({})}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px shrink-0"
                style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 10px rgba(13,148,136,0.22)' }}
              >
                <IcoPlus /> Track a Job
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  activeFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                All ({jobs.length})
              </button>
              {JOB_STATUSES.map(({ id, label, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
                  style={activeFilter === id
                    ? { backgroundColor: color, color: '#fff', borderColor: color }
                    : { backgroundColor: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }}
                >
                  {label} ({statusCounts[id] || 0})
                </button>
              ))}
            </div>

            {/* List */}
            {dataLoading ? (
              <div className="flex items-center gap-2 py-16 text-gray-400 justify-center">
                <IcoSpinner /><span className="text-sm">Loading…</span>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center text-center"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#0D948810' }}>
                  <IcoBriefcase size={24} style={{ color: '#0D9488' }} />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {jobs.length === 0 ? 'No jobs tracked yet' : 'No jobs in this stage'}
                </p>
                <p className="text-xs text-gray-400 mb-4 max-w-xs">
                  {jobs.length === 0
                    ? 'Track a job manually, or customize a resume for one in the builder — it shows up here automatically.'
                    : 'Try a different filter, or track a new job.'}
                </p>
                <button
                  onClick={() => setModalJob({})}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
                >
                  <IcoPlus size={12} /> Track a Job
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/60">
                        <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">S/N</th>
                        <SortableTh label="Job" sortKey="title" sort={sort} onSort={toggleSort} />
                        <SortableTh label="Status" sortKey="status" sort={sort} onSort={toggleSort} />
                        <SortableTh label="Applied" sortKey="applied_date" sort={sort} onSort={toggleSort} />
                        <SortableTh label="Interview" sortKey="interview_date" sort={sort} onSort={toggleSort} />
                        <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Resumes</th>
                        <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notes</th>
                        <th className="px-4 py-3" aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {sortedJobs.map((job, index) => {
                        const linkedResumes = resumesForJob(job.id);
                        const ds = deleteState[job.id] || 'idle';
                        const statusMeta = getStatusMeta(job.status);
                        return (
                          <tr key={job.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="px-4 py-3 align-top text-xs font-medium text-gray-400">{index + 1}</td>
                            <td className="px-4 py-3 align-top">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                                {job.job_url && (
                                  <a
                                    href={job.job_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-300 hover:text-teal-600 transition-colors shrink-0"
                                    title="View posting"
                                  >
                                    <IcoExternalLink />
                                  </a>
                                )}
                              </div>
                              {job.company && <p className="text-xs text-gray-400 mt-0.5">{job.company}</p>}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <select
                                value={job.status}
                                onChange={(e) => handleStatusChange(job, e.target.value)}
                                className="text-xs font-semibold border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
                                style={{ backgroundColor: `${statusMeta.color}12`, color: statusMeta.color, borderColor: `${statusMeta.color}30` }}
                              >
                                {JOB_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                              </select>
                            </td>
                            <td className="px-4 py-3 align-top text-xs text-gray-500 whitespace-nowrap">
                              {job.applied_date ? formatDate(job.applied_date) : <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 align-top text-xs whitespace-nowrap">
                              {job.interview_date ? (
                                <span className="font-semibold" style={{ color: getStatusMeta('interviewing').color }}>
                                  {formatDate(job.interview_date)}
                                </span>
                              ) : <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 align-top text-xs text-gray-500 whitespace-nowrap">
                              {linkedResumes.length > 0 ? (
                                <span className="inline-flex items-center gap-1">
                                  <IcoStar size={11} style={{ color: '#6366F1' }} />
                                  {linkedResumes.length}
                                  {linkedResumes[0]?.match_score != null && ` · ${Math.round(linkedResumes[0].match_score)}%`}
                                </span>
                              ) : <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 align-top text-xs text-gray-400" style={{ maxWidth: '220px' }}>
                              {job.notes ? (
                                <span className="inline-flex items-start gap-1">
                                  <span className="shrink-0 mt-0.5"><IcoNote /></span>
                                  <span className="line-clamp-2" title={job.notes}>{job.notes}</span>
                                </span>
                              ) : <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => setModalJob(job)}
                                  aria-label="Edit"
                                  className="p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  <IcoEdit />
                                </button>
                                {ds === 'confirming' ? (
                                  <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-2 py-1">
                                    <button onClick={() => handleDelete(job.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 transition-colors">
                                      Delete
                                    </button>
                                    <span className="text-red-200">|</span>
                                    <button onClick={() => setDeleteState((s) => ({ ...s, [job.id]: 'idle' }))} className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setDeleteState((s) => ({ ...s, [job.id]: 'confirming' }))}
                                    aria-label="Delete"
                                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                  >
                                    <IcoTrash />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="h-2" />
          </div>
        </div>
      </div>

      {modalJob !== null && (
        <JobFormModal
          initial={modalJob.id ? modalJob : null}
          onClose={() => setModalJob(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
