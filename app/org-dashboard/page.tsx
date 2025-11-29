'use client';

import React, { useState } from 'react';

// --- MOCK DATA (Translated to Mongolian) ---

type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  companyId: string;
  applicants: number;
  postedAgo: string;
  tags: string[];
};

type Applicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedAt: string;
  jobId: string;
  coverLetter: string;
  skills: string[];
  avatarUrl?: string;
};
const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "Content Writer (One-time Project)",
    description: "Write engaging articles and social media content for a marketing campaign.",
    requirements: ["Good writing skills", "SEO knowledge", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "1.5M",
    salaryMax: "2M",
    companyId: "c1",
    applicants: 2,
    postedAgo: "2 hours ago",
    tags: ["New", "Remote", "One-time"],
  },
  {
    id: "j2",
    title: "Social Media Content Creator",
    description: "Create and schedule posts for Instagram, Facebook, and TikTok.",
    requirements: ["Social media knowledge", "Graphic design skills", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "2M",
    salaryMax: "2.5M",
    companyId: "c1",
    applicants: 1,
    postedAgo: "5 hours ago",
    tags: ["Trending", "One-time"],
  },
];

const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "a1",
    name: "Anu Bat",
    email: "anu.bat@email.com",
    phone: "99112233",
    appliedAt: "2024-06-10 10:00",
    jobId: "j1",
    coverLetter: "I have strong content writing skills and 3 years of experience in digital marketing.",
    skills: ["Content Writing", "SEO", "Creative"],
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "a2",
    name: "Bataa Gan",
    email: "bataa.gan@email.com",
    phone: "88113344",
    appliedAt: "2024-06-10 11:30",
    jobId: "j1",
    coverLetter: "I have a solid background in social media and content creation.",
    skills: ["Social Media", "Copywriting"],
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "a3",
    name: "Sara T.",
    email: "sara.t@email.com",
    phone: "99001122",
    appliedAt: "2024-06-10 09:15",
    jobId: "j2",
    coverLetter: "Experienced in creating viral content for TikTok and Instagram.",
    skills: ["TikTok", "Instagram", "Video Editing"],
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// --- COMPONENTS ---

// Job Card Component - Enhanced UI
const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="font-extrabold text-xl text-indigo-700">{job.title}</h3>
      <span className="text-sm text-gray-400 whitespace-nowrap">{job.postedAgo}</span>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {job.tags.map(tag => (
        <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
      ))}
    </div>

    <p className="text-gray-700 text-sm">{job.description}</p>
    
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.727A8 8 0 016.343 5.273M17.657 16.727A8 8 0 0110 20h-2M17.657 16.727L13 21m0 0l-4-4m4 4v-5.273"></path></svg>
        <span>{job.location}</span>
      </div>
      <div className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{job.jobType}</span>
      </div>
      <div className="flex items-center gap-1 font-bold text-green-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v2m0 0c-1.657 0-3 .895-3 2s1.343 2 3 2m-3-12h6m-6 4h6m-6 4h6m-6 4h6"></path></svg>
        <span>{job.salaryMin} - {job.salaryMax} ₮</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mt-2">
      <span className="text-sm font-semibold text-gray-700">Шаардлага:</span>
      {job.requirements.map(req => (
        <span key={req} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">{req}</span>
      ))}
    </div>
  </div>
);

// Applicant Card Component - Enhanced UI
const ApplicantCard: React.FC<{ applicant: Applicant }> = ({ applicant }) => (
  <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
    <img
      src={applicant.avatarUrl || 'https://placehold.co/48x48/CCCCCC/FFFFFF?text=A'}
      alt={applicant.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
    />
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-900">{applicant.name}</span>
        <span className="text-xs text-gray-400">| Applied: {applicant.appliedAt.split(' ')[0]}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        <span className="text-indigo-600">{applicant.email}</span> | {applicant.phone}
      </div>
      
      {/* Cover Letter styling similar to Applicant message */}
      <div className="mt-3 text-sm text-gray-700 italic border-l-2 border-indigo-200 pl-3">
        &quot;Cover Letter: {applicant.coverLetter}&quot;
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs font-semibold text-gray-700">Skills:</span>
        {applicant.skills.map(skill => (
          <span key={skill} className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium">{skill}</span>
        ))}
      </div>
    </div>
    <div>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 shadow-md transition">
        See Profile
      </button>
    </div>
  </div>
);

// --- MAIN PAGE (Single Column Dashboard Layout) ---

const OrganizationDashboardPage: React.FC = () => {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const getApplicantsForJob = (jobId: string) =>
    MOCK_APPLICANTS.filter((a) => a.jobId === jobId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Posted Jobs ({MOCK_JOBS.length})
        </h2>
        
        <div className="space-y-8">
          {MOCK_JOBS.length === 0 && (
            <div className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-lg">
                No jobs posted yet.
            </div>
          )}
          {MOCK_JOBS.map((job) => {
            const applicantsCount = getApplicantsForJob(job.id).length;
            return (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="flex justify-between items-start">
                  <JobCard job={job} />
                  <div className="ml-4 flex flex-col items-end space-y-2 pt-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition whitespace-nowrap"
                      onClick={() =>
                        setExpandedJobId(expandedJobId === job.id ? null : job.id)
                      }
                    >
                      {expandedJobId === job.id
                        ? 'Hide Applications'
                        : `View Applications (${applicantsCount})`} 
                    </button>
                    <div className="text-sm text-gray-500">
                      <span className="font-bold text-gray-800">{applicantsCount}</span> Applications
                    </div>
                  </div>
                </div>
                {expandedJobId === job.id && (
                  <div className="mt-6 border-t pt-4 space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-2 text-lg">Received Applications</h4>
                    {applicantsCount === 0 ? (
                      <div className="text-gray-500 text-sm">No applications received yet.</div>
                    ) : (
                      getApplicantsForJob(job.id).map((applicant) => (
                        <ApplicantCard key={applicant.id} applicant={applicant} />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboardPage;