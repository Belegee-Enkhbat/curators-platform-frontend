'use client';

import React from 'react';

// --- MOCK DATA ---

type CreatorProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  tags: string[];
  cvLink: string;
};

type ApplicationStatus = 'Хүлээгдэж буй' | 'Хянагдсан' | 'Ярилцлага' | 'Зөвшөөрсөн' | 'Татгалзсан';

type AppliedJob = {
  id: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: ApplicationStatus;
  location: string;
  salaryRange: string;
};

// Simulated logged-in user profile
const MOCK_PROFILE: CreatorProfile = {
  id: 'user1',
  name: 'Ану Бат',
  avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Богино хэлбэрийн видео болон вирусын кампанит ажилд мэргэшсэн контент бүтээгч. Дижитал маркетингийн чиглэлээр 3 жилийн туршлагатай. Үргэлж шинэ сорилт, хамтын ажиллагаанд нээлттэй.',
  skills: ['Видео Эдит', 'TikTok', 'Өгүүлэл', 'SEO', 'Креатив'],
  tags: ['Тренд', 'Вирал', 'Богино', 'Дижитал'],
  cvLink: 'https://storage.link/anu_bat_cv.pdf', // Placeholder for CV link
};

// Simulated list of jobs the creator has applied for
const MOCK_APPLICATIONS: AppliedJob[] = [
  {
    id: 'app1',
    jobTitle: 'Контент Бичигч (Нэг удаагийн төсөл)',
    companyName: 'Монгол Зарнаа ХХК',
    appliedAt: '2024-06-10',
    status: 'Хүлээгдэж буй',
    location: 'Зайнаас',
    salaryRange: '1.5M - 2M ₮',
  },
  {
    id: 'app2',
    jobTitle: 'Сошиал Медиа Контент Бүтээгч',
    companyName: 'B Creative Agency',
    appliedAt: '2024-06-05',
    status: 'Ярилцлага',
    location: 'Улаанбаатар',
    salaryRange: '2M - 2.5M ₮',
  },
  {
    id: 'app3',
    jobTitle: 'Инфографик Дизайнер',
    companyName: 'Эко Брэнд',
    appliedAt: '2024-05-28',
    status: 'Татгалзсан',
    location: 'Зайнаас',
    salaryRange: '1.8M - 2.2M ₮',
  },
  {
    id: 'app4',
    jobTitle: 'YouTube Тоймч (Технологи)',
    companyName: 'iTech Solutions',
    appliedAt: '2024-05-15',
    status: 'Зөвшөөрсөн',
    location: 'Улаанбаатар',
    salaryRange: '3M - 3.5M ₮',
  },
];

// Helper to get status colors
const getStatusColors = (status: ApplicationStatus) => {
  switch (status) {
    case 'Хүлээгдэж буй':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ) };
    case 'Хянагдсан':
      return { bg: 'bg-blue-100', text: 'text-blue-700', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      ) };
    case 'Ярилцлага':
      return { bg: 'bg-purple-100', text: 'text-purple-700', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      ) };
    case 'Зөвшөөрсөн':
      return { bg: 'bg-green-100', text: 'text-green-700', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ) };
    case 'Татгалзсан':
      return { bg: 'bg-red-100', text: 'text-red-700', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ) };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', icon: null };
  }
};

// 1. Creator Profile / CV Card
const ProfileCard: React.FC<{ profile: CreatorProfile }> = ({ profile }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition duration-300">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
      />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900">{profile.name}</h2>
        <p className="text-sm font-medium text-indigo-600 mt-1">Контент Бүтээгч / Дижитал Маркетер</p>
        <p className="text-gray-700 mt-3 italic text-sm border-l-2 border-indigo-300 pl-3">{profile.bio}</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-3 pt-2">
        <a 
          href={profile.cvLink} 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Анкет (CV) Татах
        </a>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition">
          Профайл Засах
        </button>
      </div>
    </div>

    <div className="mt-6 pt-4 border-t border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-3">Гол Ур Чадварууд:</h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// 2. Application Status Card
const ApplicationStatusCard: React.FC<{ application: AppliedJob }> = ({ application }) => {
  const { bg, text, icon } = getStatusColors(application.status);

  return (
    <div className="flex items-start justify-between bg-white rounded-xl p-5 border border-gray-100 hover:border-indigo-300 transition duration-300 shadow-sm">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-800 truncate">{application.jobTitle}</h3>
        <p className="text-sm text-indigo-600 font-medium">{application.companyName}</p>
        
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.727A8 8 0 016.343 5.273M17.657 16.727A8 8 0 0110 20h-2M17.657 16.727L13 21m0 0l-4-4m4 4v-5.273" /></svg>
            {application.location}
          </span>
          <span className="flex items-center gap-1 font-semibold text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v2m0 0c-1.657 0-3 .895-3 2s1.343 2 3 2m-3-12h6m-6 4h6m-6 4h6m-6 4h6" /></svg>
            {application.salaryRange}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Илгээсэн огноо: {application.appliedAt}</p>
      </div>

      <div className="flex flex-col items-end gap-3 pt-1">
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${bg} ${text}`}>
          {icon}
          {application.status}
        </div>
        {application.status === 'Ярилцлага' && (
          <button className="bg-purple-500 text-white px-4 py-1 rounded-lg text-xs font-medium hover:bg-purple-600 transition shadow-sm">
            Ярилцлагын хуваарь
          </button>
        )}
        {application.status === 'Зөвшөөрсөн' && (
          <button className="bg-green-500 text-white px-4 py-1 rounded-lg text-xs font-medium hover:bg-green-600 transition shadow-sm">
            Гэрээний мэдээлэл
          </button>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

const UserDashboardPage: React.FC = () => {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Section 1: Profile and CV */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Миний Профайл / CV
          </h2>
          <div className="mb-10">
            <ProfileCard profile={MOCK_PROFILE} />
          </div>

          {/* Section 2: Applied Jobs Status */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Ажлын Анкетны Статус ({MOCK_APPLICATIONS.length})
          </h2>
          
          <div className="space-y-4">
            {MOCK_APPLICATIONS.length === 0 ? (
              <div className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-lg">
                  Та одоогоор ажлын хүсэлт илгээгээгүй байна.
              </div>
            ) : (
              MOCK_APPLICATIONS.map((app) => (
                <ApplicationStatusCard key={app.id} application={app} />
              ))
            )}
          </div>
        </div>
      </div>
    );
};

export default UserDashboardPage;