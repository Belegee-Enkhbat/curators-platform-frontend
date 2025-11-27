'use client';
import React, { useState } from 'react';

// --- JSDoc Type Definitions (Simulating TypeScript Interfaces/Schema) ---

/**
 * @typedef {Object} Company
 * @property {string} id
 * @property {string} name
 * @property {string} logoUrl - Placeholder URL for logo.
 * @property {string} location
 */

/**
 * @typedef {Object} Job
 * @property {string} id
 * @property {string} title
 * @property {string} salaryMin
 * @property {string} salaryMax
 * @property {string} companyId
 * @property {number} applicants
 * @property {string} postedAgo - E.g., '3 цаг өмнө'
 * @property {('New'|'Trending'|'Urgent'|'None')[]} tags
 */

// TypeScript interface for Job
interface Job {
    id: string;
    title: string;
    salaryMin: string;
    salaryMax: string;
    companyId: string;
    applicants: number;
    postedAgo: string;
    tags: ('New' | 'Trending' | 'Urgent' | 'None')[];
}

/**
 * @typedef {Object} FilterSection
 * @property {string} id
 * @property {string} label
 * @property {string[]} options
 * @property {string} [type] - 'button' or 'tag'
 */

// --- Mock Data (Simulating data/mockData.ts) ---

/** @type {Company[]} */
const MOCK_COMPANIES = [
    { id: 'c1', name: 'Canadian School of Manbaatar', logoUrl: 'https://placehold.co/40x40/003366/ffffff?text=CSM', location: 'Ulaanbaatar' },
    { id: 'c2', name: 'Tono Zhang Mining', logoUrl: 'https://placehold.co/40x40/FF7700/ffffff?text=TZM', location: 'Ulaanbaatar' },
    { id: 'c3', name: 'MSM Group', logoUrl: 'https://placehold.co/40x40/000000/ffffff?text=MSM', location: 'Ulaanbaatar' },
    { id: 'c4', name: 'Bluetop Group', logoUrl: 'https://placehold.co/40x40/0000FF/ffffff?text=BG', location: 'Ulaanbaatar' },
    { id: 'c5', name: 'POMALL', logoUrl: 'https://placehold.co/40x40/CC0000/ffffff?text=P', location: 'Ulaanbaatar' },
];

const MOCK_JOBS: Job[] = [
    { id: 'j1', title: 'Human Resource Manager', salaryMin: '5 сая', salaryMax: '5.5 сая', companyId: 'c1', applicants: 11, postedAgo: '3 цаг өмнө', tags: ['New', 'Trending'] },
    { id: 'j2', title: 'Аман Болон Вингийн Оруулгч', salaryMin: '2.5 сая', salaryMax: '3.5 сая', companyId: 'c2', applicants: 2, postedAgo: '2+ capд өмнө', tags: ['New'] },
    { id: 'j3', title: 'Сэлбэгийн Зохицуулагч / Оюу Толгой Төсөл/', salaryMin: '2.5 сая', salaryMax: '3 сая', companyId: 'c3', applicants: 5, postedAgo: '16-н өдөр өмнө', tags: ['Trending'] },
    { id: 'j4', title: 'Харилцааны ажилтан', salaryMin: '2 сая', salaryMax: '2.5 сая', companyId: 'c3', applicants: 1, postedAgo: '10 цагийн өмнө', tags: ['New'] },
    { id: 'j5', title: 'Ерөнхий Менежер', salaryMin: '4.5 сая', salaryMax: '5 сая', companyId: 'c4', applicants: 48, postedAgo: '5 цагийн өмнө', tags: ['New'] },
    { id: 'j6', title: 'Сонгон Шалгаруулалт Хариуцсан Мэргэжилтэн', salaryMin: '2.5 сая', salaryMax: '3 сая', companyId: 'c5', applicants: 1, postedAgo: '5 цагийн өмнө', tags: ['New'] },
];

/** @type {FilterSection[]} */
const MOCK_FILTERS = [
    {
        id: 'level',
        label: 'Түвшин',
        options: ['Дээд шатны', 'Гүйцэтгэх/Удирдагч', 'Дунд шатны', 'Шинэ ажилтан'],
        type: 'button'
    },
    {
        id: 'profession',
        label: 'Мэргэжил',
        options: ['Менежмент', 'Нягтлан, Санхүү', 'Боловсрол', 'Бүтээгдэхүүн'],
        type: 'tag'
    },
];

/**
 * Simple SVG Icons (Replacing Lucide/FontAwesome for UI replication)
 * @param {Object} props
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
interface HeartProps {
  className?: string;
}

// Global type for all SVG icons
type IconProps = React.SVGProps<SVGSVGElement>;

// Example usage:
const Heart: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Share: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <polyline points="16 6 12 2 8 6"/>
    <line x1="12" x2="12" y1="2" y2="15"/>
  </svg>
);

const Clock: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const UserCheck: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
  </svg>
);

const ArrowRight: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

// --- UI Component Implementations (Simulating components/ui, components/jobs) ---

/**
 * @param {Object} props
 * @param {('default' | 'small' | 'hot' | 'urgent')} [props.variant]
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'small' | 'hot' | 'urgent';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
    let baseClass = 'rounded-full px-2.5 py-0.5 text-xs font-medium border ';
    if (variant === 'small') baseClass = 'rounded-lg px-3 py-1 text-sm font-medium border ';

    switch (variant) {
        case 'hot':
            return <span className={baseClass + 'bg-red-50 border-red-200 text-red-600'}>🔥 {children}</span>;
        case 'urgent':
            return <span className={baseClass + 'bg-yellow-50 border-yellow-200 text-yellow-600'}>✨ {children}</span>;
        case 'small':
            return <span className={baseClass + 'bg-gray-100 border-gray-300 text-gray-700'}>{children}</span>;
        case 'default':
        default:
            return <span className={baseClass + 'bg-indigo-50 border-indigo-200 text-indigo-600'}>{children}</span>;
    }
};

/**
 * Renders a single job listing card. (Simulating components/jobs/JobCard.tsx)
 * @param {Object} props
 * @param {Job} props.job
 * @returns {JSX.Element}
 */
const JobListItem = ({ job }: { job: Job }) => {
    const company = MOCK_COMPANIES.find(c => c.id === job.companyId);
    if (!company) return null;

    const salaryDisplay = `${job.salaryMin} - ${job.salaryMax}/capд`;

    // Map internal tags to UI badges
    const getBadge = (tag: string) => {
        switch (tag) {
            case 'New': return <Badge variant="default" key={tag}>{job.applicants} анкет</Badge>;
            case 'Trending': return <Badge variant="hot" key={tag}>Эрэлттэй</Badge>;
            case 'Urgent': return <Badge variant="urgent" key={tag}>Шинэ</Badge>;
            default: return null;
        }
    };

    return (
        <div className="bg-white p-6 border-b border-gray-200 hover:shadow-lg transition duration-200 cursor-pointer">
            <div className="flex items-start justify-between">
                <div className="flex items-start">
                    {/* Company Logo (First initial in background) */}
                    <div className="h-10 w-10 mr-4 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={company.logoUrl} alt={`${company.name} logo`} onError={(e) => e.currentTarget.style.display = 'none'} className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600">{job.title}</h3>
                        <p className="text-sm text-indigo-600 font-medium">{company.name}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.applicants} анкет</span>
                    <Heart className="hover:text-red-500 cursor-pointer" />
                    <Share className="hover:text-indigo-600 cursor-pointer" />
                </div>
            </div>

            <div className="mt-3 flex justify-between items-center pl-14">
                <p className="text-gray-600 font-medium">{salaryDisplay}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex space-x-2">
                        {job.tags.map(getBadge)}
                    </div>
                    <span>{job.postedAgo}</span>
                </div>
            </div>
        </div>
    );
};


/**
 * Renders the filter sidebar. (Simulating components/jobs/Sidebar.tsx - adapted for filters)
 * @param {Object} props
 * @param {string} props.activeProfession
 * @param {(p: string) => void} props.onSelectProfession
 * @returns {JSX.Element}
 */
interface JobSearchSidebarProps {
    activeProfession: string;
    onSelectProfession: (p: string) => void;
}

const JobSearchSidebar: React.FC<JobSearchSidebarProps> = ({ activeProfession, onSelectProfession }) => {
    const [salaryMin, setSalaryMin] = useState(2); // State for salary range (mocked for UI)
    const [salaryMax, setSalaryMax] = useState(10);

    return (
        <div className="w-full max-w-sm p-6 space-y-8 bg-white border-r border-gray-200 sticky top-0 h-full overflow-y-auto">
            {/* Search Input */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">Хайлт</h2>
                <input
                    type="text"
                    placeholder="Программын инженерийн"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Personalized Recommendations */}
            <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50 flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 transition">
                <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full text-white font-bold">A</div>
                <div className="text-sm">
                    <p className="font-semibold text-gray-900">Надад тохирсон</p>
                    <p className="text-xs text-gray-600">Get personalized recommendations</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="space-y-6">
                {MOCK_FILTERS.map((section) => (
                    <div key={section.id} className="space-y-3 border-b border-gray-100 pb-4">
                        <h3 className="text-base font-semibold text-gray-900">{section.label}</h3>
                        <div className={`flex flex-wrap ${section.type === 'tag' ? 'gap-2' : 'space-y-2'}`}>
                            {section.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => onSelectProfession(option)}
                                    className={`
                                        ${section.type === 'tag' ? 'px-3 py-1 text-sm rounded-full border' : 'w-full py-2 px-3 text-left rounded-lg'}
                                        ${option === activeProfession || option === 'Бүтээгдэхүүн'
                                            ? 'bg-indigo-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}
                                        transition duration-150 text-sm
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Salary Filter (Цалин) */}
                <div className="space-y-3">
                    <h3 className="text-base font-semibold text-gray-900">Цалин</h3>
                    <div className="flex justify-between text-gray-500 text-xs">
                        <span>7 сая</span>
                        <span>10 сая</span>
                    </div>
                    {/* Placeholder for range slider UI */}
                    <div className="h-1 bg-indigo-200 rounded-full relative my-3">
                        <div className="absolute h-1 bg-indigo-500 rounded-full" style={{ left: '20%', right: '10%' }}></div>
                        <div className="absolute w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-md" style={{ left: '20%', top: '-6px' }}></div>
                        <div className="absolute w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-md" style={{ left: '90%', top: '-6px' }}></div>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm">
                        <span>min</span>
                        <span>max</span>
                    </div>
                </div>

                {/* Companies Filter (Компаниуд) */}
                <div className="pt-4 border-t border-gray-100">
                    <button className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-900 hover:text-indigo-600 transition">
                        Компаниуд
                        <ArrowRight className="text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component (Simulating app/creator/page.tsx) ---

/** @returns {JSX.Element} */
const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <div className="flex items-center text-gray-900 font-bold text-xl">
                    <span className="text-indigo-600 text-3xl font-extrabold mr-1">.</span> Curators
                </div>
                <nav className="hidden md:flex space-x-6 text-sm text-gray-600 font-medium">
                    <a href="#" className="hover:text-indigo-600">Ажлын байр</a>
                    <a href="#" className="hover:text-indigo-600">Талент</a>
                    <a href="#" className="hover:text-indigo-600">Кареер зөвлөгөө</a>
                    <a href="#" className="hover:text-indigo-600">А/Т туслах</a>
                    <a href="#" className="hover:text-indigo-600">Ламбдаг хүн юу?</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                    Талент
                </button>
                <button className="text-sm font-semibold text-gray-700 hover:text-indigo-600">
                    Ажил олгогч
                </button>
                <div className="text-gray-700 text-sm font-medium">🇲🇳 MN</div>
            </div>
        </div>
    </header>
);

export default function CreatorJobSearchPage() {
    // State for filter selection simulation
    const [activeProfession, setActiveProfession] = useState('Бүтээгдэхүүн');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto flex">
                {/* Left Sidebar - Filters */}
                <div className="w-1/3 min-w-[300px] border-r border-gray-200 bg-white">
                    <JobSearchSidebar 
                        activeProfession={activeProfession} 
                        onSelectProfession={setActiveProfession} 
                    />
                </div>

                {/* Right Content - Job Listings */}
                <div className="flex-1 min-h-screen bg-white">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">
                            {MOCK_JOBS.length} Jobs
                        </h2>
                        <div className="space-y-2">
                            {MOCK_JOBS.map((job) => (
                                <JobListItem key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}