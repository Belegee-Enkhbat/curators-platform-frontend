'use client';

import { JobSearchSidebar } from '@/components/jobs/JobSearchSidebar';
import React, { useState } from 'react';

// --- MOCK DATA (Translated to Mongolian) ---

type Creator = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  tags: string[];
  applicants: CreatorApplicant[];
};

type CreatorApplicant = {
  id: string;
  name: string;
  avatarUrl: string;
  type: 'Sponsor' | 'Collab' | 'Message';
  message: string;
  appliedAt: string;
};

const MOCK_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'Anu Bat',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Content creator specializing in short-form videos and viral campaigns. Open to sponsorships and collaborations.',
    skills: ['Video Editing', 'TikTok', 'Writing'],
    tags: ['Trending', 'Viral', 'Short-form'],
    applicants: [
      {
        id: 'a1',
        name: 'Mongol Zarnaa LLC',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        type: 'Sponsor',
        message: 'We would like to sponsor your next TikTok series!',
        appliedAt: '2024-06-10 10:00',
      },
      {
        id: 'a2',
        name: 'Sara T.',
        avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        type: 'Collab',
        message: 'Let’s create another viral duet together!',
        appliedAt: '2024-06-10 11:30',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Bataa Gan',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Information graphic designer and content writer. Looking for brands to collaborate with.',
    skills: ['Infographic', 'Content Writing', 'Branding'],
    tags: ['Design', 'Writing', 'Brand'],
    applicants: [
      {
        id: 'a3',
        name: 'Eco Brand',
        avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
        type: 'Sponsor',
        message: 'Interested in sponsoring your next infographic series.',
        appliedAt: '2024-06-09 09:15',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Enkhee Naran',
    avatarUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
    bio: 'Tech-focused YouTube channel host. Loves reviewing and testing new products.',
    skills: ['YouTube', 'Review Writing', 'Video Production'],
    tags: ['Technology', 'Gadgets', 'Long-form'],
    applicants: [
      {
        id: 'a4',
        name: 'iTech Solutions',
        avatarUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
        type: 'Sponsor',
        message: 'We’d like to collaborate on a smart watch review.',
        appliedAt: '2024-06-11 14:00',
      },
    ],
  },
  {
    id: 'c4',
    name: 'Dorj Bayar',
    avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    bio: 'Photography expert. Creates travel and nature photography content.',
    skills: ['Photography', 'Adobe Lightroom', 'Travel'],
    tags: ['Travel', 'Nature', 'Photography'],
    applicants: [
      {
        id: 'a5',
        name: 'Travel Agency',
        avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
        type: 'Collab',
        message: 'Let’s organize a joint photo tour in the Gobi desert.',
        appliedAt: '2024-06-10 16:45',
      },
      {
        id: 'a6',
        name: 'Munkh-Erdene',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        type: 'Message',
        message: 'I have a question about your photography techniques.',
        appliedAt: '2024-06-11 08:30',
      },
    ],
  },
  {
    id: 'c5',
    name: 'Gankhuu Khand',
    avatarUrl: 'https://randomuser.me/api/portraits/women/71.jpg',
    bio: 'Creates content around cooking and health. Promotes a positive lifestyle.',
    skills: ['Food Blogging', 'Recipe Writing', 'Food Photography'],
    tags: ['Food', 'Health', 'Lifestyle'],
    applicants: [
      {
        id: 'a7',
        name: 'Organic Food',
        avatarUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
        type: 'Sponsor',
        message: 'We’d like to propose cooking with our organic products.',
        appliedAt: '2024-06-08 11:00',
      },
    ],
  },
  {
    id: 'c6',
    name: 'Khurelbaatar',
    avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
    bio: 'Creates short fitness videos and training sessions.',
    skills: ['Coaching', 'Video Editing', 'Social Media'],
    tags: ['Fitness', 'Exercise', 'Energy'],
    applicants: [
      {
        id: 'a8',
        name: 'Gym Equipment MGL',
        avatarUrl: 'https://randomuser.me/api/portraits/women/88.jpg',
        type: 'Sponsor',
        message: 'Proposal to use our equipment in your workout videos.',
        appliedAt: '2024-06-12 10:30',
      },
      {
        id: 'a9',
        name: 'Tuvshin-Erdene',
        avatarUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
        type: 'Collab',
        message: 'We could do a duet with two different types of workouts.',
        appliedAt: '2024-06-12 11:00',
      },
    ],
  },
  {
    id: 'c7',
    name: 'Ider Oyoon',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    bio: 'Creates podcasts and articles on education and career development.',
    skills: ['Podcast', 'Content Writing', 'Research'],
    tags: ['Education', 'Career', 'Podcast'],
    applicants: [
      {
        id: 'a10',
        name: 'Manlai Academy',
        avatarUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
        type: 'Sponsor',
        message: 'We’d like to feature our training program.',
        appliedAt: '2024-06-13 15:00',
      },
    ],
  },
  {
    id: 'c8',
    name: 'Jargal Saikhan',
    avatarUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
    bio: 'Makes easy-to-understand infographics and short videos about finance and investing.',
    skills: ['Finance', 'Infographic', 'Research'],
    tags: ['Finance', 'Investment', 'Education'],
    applicants: [],
  },
  {
    id: 'c9',
    name: 'Orgil Tuvshin',
    avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    bio: 'Online gaming and streaming content creator. Has an active fanbase.',
    skills: ['Streaming', 'Game Review', 'Video Editing'],
    tags: ['Gaming', 'Streamer', 'Twitch'],
    applicants: [
      {
        id: 'a11',
        name: 'Game Zone Mongolia',
        avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
        type: 'Sponsor',
        message: 'Proposal to promote our gaming accessories.',
        appliedAt: '2024-06-14 19:30',
      },
    ],
  },
  {
    id: 'c10',
    name: 'Purevsuren',
    avatarUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
    bio: 'Creates DIY content for arts and crafts. Active on Instagram and Pinterest.',
    skills: ['Crafts', 'Drawing', 'Instagram'],
    tags: ['Art', 'DIY', 'Handmade'],
    applicants: [
      {
        id: 'a12',
        name: 'Craft Store',
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        type: 'Collab',
        message: 'We’d like to create a collaborative video using our materials.',
        appliedAt: '2024-06-15 09:00',
      },
      {
        id: 'a13',
        name: 'Mongol Sewing',
        avatarUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        type: 'Message',
        message: 'Please send a photo of your new creation.',
        appliedAt: '2024-06-15 10:45',
      },
    ],
  },
];

// Helper to get type color
const getTypeColors = (type: CreatorApplicant['type']) => {
  switch (type) {
    case 'Sponsor':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Ивээн Тэтгэх' };
    case 'Collab':
      return { bg: 'bg-pink-100', text: 'text-pink-700', label: 'Хамтран Ажиллах' };
    case 'Message':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Мессеж' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Бусад' };
  }
};

// --- COMPONENTS ---


// 2. Creator Card Component
const CreatorCard: React.FC<{ creator: Creator; expanded: boolean; onToggle: () => void }> = ({
  creator,
  expanded,
  onToggle,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4 flex-1">
        <img
          src={creator.avatarUrl}
          alt={creator.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
          </div>
          <div className="flex gap-2 mt-1">
            {creator.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2 text-gray-700 text-sm italic">{creator.bio}</div>
          <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">
            {creator.skills.map((skill) => (
              <span
                key={skill}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-4 flex flex-col items-end space-y-2">
        <button
          className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition"
          onClick={onToggle}
        >
          {expanded
            ? 'Hide comments' // Hide Applicants
            : `View comments (${creator.applicants.length})`} {/* View Applicants */}
        </button>
        <div className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">{creator.applicants.length}</span> Comments
        </div>
      </div>
    </div>
    {expanded && (
      <div className="mt-6 border-t pt-4 space-y-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-lg">Received Comments</h4> {/* Applicants */}
        {creator.applicants.length === 0 ? (
          <div className="text-gray-500 text-sm">No comments received yet.</div>
        ) : (
          creator.applicants.map((applicant) => (
            <CreatorApplicantCard key={applicant.id} applicant={applicant} />
          ))
        )}
      </div>
    )}
  </div>
);

// 3. Applicant Card Component
const CreatorApplicantCard: React.FC<{ applicant: CreatorApplicant }> = ({ applicant }) => {
  const { bg, text, label } = getTypeColors(applicant.type);
  
  // Action button logic based on type

  return (
    <div className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
      <img
        src={applicant.avatarUrl}
        alt={applicant.name}
        className="w-12 h-12 rounded-full object-cover border"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{applicant.name}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
            {label}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-700 italic border-l-2 border-gray-200 pl-3">
          &quot;{applicant.message}&quot;
        </div>
      </div>
     
    </div>
  );
};


// --- MAIN PAGE (Dashboard Layout) ---

export default function ActiveContentCreator() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Main Content Area: Sidebar (1/4) and List (3/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column - Sidebar (1/4 width) */}
          <div className="lg:col-span-1">
            <JobSearchSidebar
              activeProfession=""
              onSelectProfession={() => {}}
            />
          </div>

          {/* Right Column - Creator List (3/4 width) */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Active Content Creators
            </h2>
            
            <div className="space-y-6">
              {MOCK_CREATORS.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  expanded={expandedId === creator.id}
                  onToggle={() =>
                    setExpandedId(expandedId === creator.id ? null : creator.id)
                  }
                />
              ))}
            </div>
            
            {MOCK_CREATORS.length === 0 && (
                <div className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-lg">
                    No active content creators found at the moment.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}