import { Company, Job, FilterSection } from "@/types/schema";

export const MOCK_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "Canadian School of Manbaatar",
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
    title: "Контент зохиогч (Нэг удаагийн төсөл)",
    description: "Маркетингийн кампанит ажилд зориулсан сонирхолтой нийтлэл, сошиал медиа контент бичих.",
    requirements: ["Сайн бичих ур чадвар", "SEO мэдлэг", "Бүтээлч сэтгэлгээ"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "1.5 сая",
    salaryMax: "2 сая",
    companyId: "c1",
    applicants: 12,
    postedAgo: "2 цагийн өмнө",
    tags: ["Шинэ", "Remote", "Нэг удаа"],
  },
  {
    id: "j2",
    title: "Сошиал медиа контент бүтээгч",
    description: "Instagram, Facebook, TikTok платформд зориулсан постуудыг үүсгэж, хуваарилах.",
    requirements: ["Сошиал медиа хэрэгслийн мэдлэг", "График дизайны ур чадвар", "Бүтээлч сэтгэлгээ"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "2 сая",
    salaryMax: "2.5 сая",
    companyId: "c2",
    applicants: 8,
    postedAgo: "5 цагийн өмнө",
    tags: ["Тренд", "Нэг удаа"],
  },
  {
    id: "j3",
    title: "Видео монтажер / Богино хэмжээний контент",
    description: "Маркетинг, сурталчилгааны богино видеог засварлах, эффект нэмэх.",
    requirements: ["Видео засварлах ур чадвар", "Adobe Premiere эсвэл Final Cut мэдлэг", "Бүтээлч санаа"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "2.5 сая",
    salaryMax: "3 сая",
    companyId: "c3",
    applicants: 15,
    postedAgo: "1 өдөр өмнө",
    tags: ["Шинэ", "Яаралтай", "Нэг удаа"],
  },
  {
    id: "j4",
    title: "График дизайнер / Сошиал медиа",
    description: "Сошиал медиа контент болон сурталчилгааны зураг төсөл боловсруулах.",
    requirements: ["Adobe Photoshop, Illustrator мэдлэг", "Бүтээлч сэтгэлгээ"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "1.8 сая",
    salaryMax: "2.2 сая",
    companyId: "c4",
    applicants: 7,
    postedAgo: "3 цагийн өмнө",
    tags: ["Remote", "Нэг удаа"],
  },
  {
    id: "j5",
    title: "TikTok / Reels контент бүтээгч",
    description: "Богино видеонуудыг бүтээх, TikTok болон Instagram Reels-д зориулан контент хийх.",
    requirements: ["Видео бичлэг, засварлах чадвар", "Сошиал платформын мэдлэг", "Бүтээлч санаа"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "2 сая",
    salaryMax: "2.8 сая",
    companyId: "c5",
    applicants: 20,
    postedAgo: "4 цагийн өмнө",
    tags: ["Тренд", "Шинэ", "Нэг удаа"],
  },
  {
    id: "j6",
    title: "Копирайтер / Маркетингийн контент",
    description: "Маркетинг, сурталчилгааны текст бичих, брэндийн өнгө аясыг барих.",
    requirements: ["Сайн бичих чадвар", "Маркетингийн мэдлэг", "Бүтээлч сэтгэлгээ"],
    location: "Ажлаас гадуур / Remote",
    jobType: "Гэрээт / Contract",
    salaryMin: "1.5 сая",
    salaryMax: "2.5 сая",
    companyId: "c6",
    applicants: 5,
    postedAgo: "6 цагийн өмнө",
    tags: ["Шинэ", "Нэг удаа"],
  },
];


// @/data/mockData.ts (MOCK_FILTERS-г шинэчлэх)
export const MOCK_FILTERS = [
  {
    id: 'f1',
    label: 'Мэргэжил / Үүрэг',
    type: 'tag',
    options: [
      'Контент Зохиогч',
      'Видео Монтаж',
      'График Дизайн',
      'Сошиал Медиа Менежер',
      'Копирайтер',
    ],
  },
  {
    id: 'f2',
    label: 'Контентын Төрөл',
    type: 'list',
    options: [
      'Богино Видео (Reels/TikTok)',
      'Урт Видео (YouTube)',
      'Нийтлэл/Блог',
      'Сошиал Постууд',
      'Зурагт Хөрөг/Инфографик',
    ],
  },
  {
    id: 'f3',
    label: 'Байршил',
    type: 'tag',
    options: [
      'Ажлаас гадуур (Remote)',
      'Оффист (Улаанбаатар)',
      'Хосолсон',
    ],
  },
  {
    id: 'f4',
    label: 'Шаардлагатай Хэрэгсэл',
    type: 'tag',
    options: [
      'Adobe Premiere Pro',
      'Final Cut Pro',
      'Adobe Photoshop/Illustrator',
      'SEO мэдлэг',
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
    contentTitle: "Viral 15 Секундын Дуутай Бүжиг (TikTok)",
    contentPlatform: "TikTok/Instagram Reels",
    aiRoast: "Тунхаг: Энэхүү 15 секундын бичлэг нь TikTok-ын алгоритмыг хамгийн хямд аргаар хууран мэхэлж, 10-17 насны хүүхдүүдийн сэтгэлийг хөдөлгөж чадсан байна. Контентын чанар 2/10, Гэхдээ вирусын потенциал 10/10. Хэрэв таны зорилтот бүлэг 18-аас дээш бол энэ контентыг 'орхигдуулсан'. (Таны дараагийн контент яг ийм байх ёстой.)",
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

