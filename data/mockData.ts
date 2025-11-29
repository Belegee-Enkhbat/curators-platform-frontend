import { Company, Job, FilterSection } from "@/types/schema";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "Canadian School of Ulaanbaatar",
    logoUrl: "https://placehold.co/40x40/003366/ffffff?text=CSM",
    location: "Ulaanbaatar",
  },
  {
    id: "c2",
    name: "Tono Zhang Mining",
    logoUrl: "https://placehold.co/40x40/FF7700/ffffff?text=TZM",
    location: "Ulaanbaatar",
  },
  {
    id: "c3",
    name: "MSM Group",
    logoUrl: "https://placehold.co/40x40/000000/ffffff?text=MSM",
    location: "Ulaanbaatar",
  },
  {
    id: "c4",
    name: "Bluetop Group",
    logoUrl: "https://placehold.co/40x40/0000FF/ffffff?text=BG",
    location: "Ulaanbaatar",
  },
  {
    id: "c5",
    name: "POMALL",
    logoUrl: "https://placehold.co/40x40/CC0000/ffffff?text=P",
    location: "Ulaanbaatar",
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "Content Creator (One-time Project)",
    description: "Write engaging articles and social media content for a marketing campaign.",
    requirements: ["Good writing skills", "SEO knowledge", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "1.5M MNT",
    salaryMax: "2M MNT",
    companyId: "c1",
    applicants: 12,
    postedAgo: "2 hours ago",
    tags: ["New", "Remote", "One-time"],
  },
  {
    id: "j2",
    title: "Social Media Content Creator",
    description: "Create and schedule posts for Instagram, Facebook, TikTok platforms.",
    requirements: ["Social media tools knowledge", "Graphic design skills", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "2M MNT",
    salaryMax: "2.5M MNT",
    companyId: "c2",
    applicants: 8,
    postedAgo: "5 hours ago",
    tags: ["Trending", "One-time"],
  },
  {
    id: "j3",
    title: "Video Editor / Short-form Content",
    description: "Edit short marketing and promotional videos, add effects.",
    requirements: ["Video editing skills", "Adobe Premiere or Final Cut knowledge", "Creative ideas"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "2.5M MNT",
    salaryMax: "3M MNT",
    companyId: "c3",
    applicants: 15,
    postedAgo: "1 day ago",
    tags: ["New", "Urgent", "One-time"],
  },
  {
    id: "j4",
    title: "Graphic Designer / Social Media",
    description: "Design social media content and promotional graphics.",
    requirements: ["Adobe Photoshop, Illustrator knowledge", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "1.8M MNT",
    salaryMax: "2.2M MNT",
    companyId: "c4",
    applicants: 7,
    postedAgo: "3 hours ago",
    tags: ["Remote", "One-time"],
  },
  {
    id: "j5",
    title: "TikTok / Reels Content Creator",
    description: "Create short videos for TikTok and Instagram Reels.",
    requirements: ["Video shooting and editing skills", "Social platform knowledge", "Creative ideas"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "2M MNT",
    salaryMax: "2.8M MNT",
    companyId: "c5",
    applicants: 20,
    postedAgo: "4 hours ago",
    tags: ["Trending", "New", "One-time"],
  },
  {
    id: "j6",
    title: "Copywriter / Marketing Content",
    description: "Write marketing and promotional texts while maintaining brand voice.",
    requirements: ["Good writing skills", "Marketing knowledge", "Creative mindset"],
    location: "Remote",
    jobType: "Contract",
    salaryMin: "1.5M MNT",
    salaryMax: "2.5M MNT",
    companyId: "c6",
    applicants: 5,
    postedAgo: "6 hours ago",
    tags: ["New", "One-time"],
  },
];

export const MOCK_FILTERS: FilterSection[] = [
  {
    id: 'f1',
    label: 'Role / Position',
    type: 'tag',
    options: [
      'Content Creator',
      'Video Editing',
      'Graphic Design',
      'Social Media Manager',
      'Copywriter',
    ],
  },
  {
    id: 'f2',
    label: 'Content Type',
    type: 'tag',
    options: [
      'Short Video (Reels/TikTok)',
      'Long Video (YouTube)',
      'Article/Blog',
      'Social Posts',
      'Poster/Infographic',
    ],
  },
  {
    id: 'f3',
    label: 'Location',
    type: 'tag',
    options: [
      'Remote',
      'Office (Ulaanbaatar)',
      'Hybrid',
    ],
  },
  {
    id: 'f4',
    label: 'Required Tools',
    type: 'tag',
    options: [
      'Adobe Premiere Pro',
      'Final Cut Pro',
      'Adobe Photoshop/Illustrator',
      'SEO knowledge',
      'CapCut',
    ],
  },
];

export const users = [
  {
    id: 'u1',
    name: 'John Doe',
    type: 'curator',
    verified: true,
    rating: 4.5,
    social: {
      twitter: 'johndoe',
      youtube: 'johndoechannel',
      followers: 1200,
      engagement: 5.2,
    },
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    type: 'organization',
    verified: false,
    rating: 4.0,
    social: {
      twitter: 'janesmith',
      youtube: 'janesmithchannel',
      followers: 800,
      engagement: 3.8,
    },
  },
];

export const MOCK_AI_ANALYSIS = {
    contentTitle: "Viral 15-Second Dance Video (TikTok)",
    contentPlatform: "TikTok/Instagram Reels",
    aiRoast: "Summary: This 15-second clip exploited TikTok's algorithm to maximize reach, engaging 10-17-year-olds. Content quality: 2/10, Viral potential: 10/10. If your target audience is 18+, skip this type of content. (Your next content should aim for this style.)",
    keyMetrics: {
        totalViews: '7.1M',
        avgWatchTime: '8.5 sec',
        saveRate: '1.2%',
        conversionRate: '0.01%' 
    },
    platformReach: [
        { name: 'TikTok', reach: 80, color: 'bg-black' },
        { name: 'Instagram Reels', reach: 15, color: 'bg-pink-600' },
        { name: 'YouTube Shorts', reach: 5, color: 'bg-red-600' },
    ],
    targetAge: [
        { range: '10-17', engagement: 60, color: 'bg-purple-500' },
        { range: '18-24', engagement: 25, color: 'bg-indigo-500' },
        { range: '25+', engagement: 15, color: 'bg-gray-500' },
    ]
};
