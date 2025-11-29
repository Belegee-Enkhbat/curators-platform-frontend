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
    name: 'Ану Бат',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Богино хэлбэрийн видео болон вирусын кампанит ажилд мэргэшсэн контент бүтээгч. Ивээн тэтгэлэг болон хамтын ажиллагаанд нээлттэй.',
    skills: ['Видео Эдит', 'TikTok', 'Өгүүлэл'],
    tags: ['Тренд', 'Вирал', 'Богино'],
    applicants: [
      {
        id: 'a1',
        name: 'Монгол Зарнаа ХХК',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        type: 'Sponsor',
        message: 'Бид таны дараагийн TikTok цувралыг ивээн тэтгэхийг хүсэж байна!',
        appliedAt: '2024-06-10 10:00',
      },
      {
        id: 'a2',
        name: 'Сара Т.',
        avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        type: 'Collab',
        message: 'Хамтдаа дахин нэг вирал дуэт хийцгээе!',
        appliedAt: '2024-06-10 11:30',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Батаа Ган',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Мэдээллийн график дизайнер ба контент бичигч. Хамтран ажиллах брэндүүдийг хайж байна.',
    skills: ['Инфографик', 'Контент Бичих', 'Брэндинг'],
    tags: ['Дизайн', 'Бичих', 'Брэнд'],
    applicants: [
      {
        id: 'a3',
        name: 'Эко Брэнд',
        avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
        type: 'Sponsor',
        message: 'Таны дараагийн инфографик цувралыг ивээн тэтгэх сонирхолтой байна.',
        appliedAt: '2024-06-09 09:15',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Энхээ Наран',
    avatarUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
    bio: 'Технологийн чиглэлийн YouTube суваг хөтлөгч. Шинэ бүтээгдэхүүний тойм болон туршилт хийх дуртай.',
    skills: ['YouTube', 'Тойм Бичих', 'Видео Продакшн'],
    tags: ['Технологи', 'Гаджет', 'Урт Формат'],
    applicants: [
      {
        id: 'a4',
        name: 'iTech Solutions',
        avatarUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
        type: 'Sponsor',
        message: 'Бидний ухаалаг цагны тоймыг хийх саналтай байна.',
        appliedAt: '2024-06-11 14:00',
      },
    ],
  },
  {
    id: 'c4',
    name: 'Дорж Баяр',
    avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    bio: 'Зураг, гэрэл зургийн мэргэжилтэн. Аялал, байгалийн гэрэл зургийн контент үүсгэдэг.',
    skills: ['Гэрэл Зураг', 'Adobe Lightroom', 'Аялал'],
    tags: ['Аялал', 'Байгаль', 'Зураг'],
    applicants: [
      {
        id: 'a5',
        name: 'Аялал жуулчлалын агентлаг',
        avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
        type: 'Collab',
        message: 'Говьд хамтарсан фото аялал зохион байгуулъя.',
        appliedAt: '2024-06-10 16:45',
      },
      {
        id: 'a6',
        name: 'Мөнх-Эрдэнэ',
        avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        type: 'Message',
        message: 'Таны зургийн техникийн талаар асуух зүйл байна.',
        appliedAt: '2024-06-11 08:30',
      },
    ],
  },
  {
    id: 'c5',
    name: 'Ганхүү Ханд',
    avatarUrl: 'https://randomuser.me/api/portraits/women/71.jpg',
    bio: 'Хоол хийх, эрүүл мэндийн чиглэлээр контент үүсгэдэг. Эерэг хандлага түгээгч.',
    skills: ['Хоолны Блог', 'Рецепт Бичих', 'Фото зураг (Хоол)'],
    tags: ['Хоол', 'Эрүүл Мэнд', 'Амьдралын Хэв Маяг'],
    applicants: [
      {
        id: 'a7',
        name: 'Органик Хүнс',
        avatarUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
        type: 'Sponsor',
        message: 'Манай органик бүтээгдэхүүнээр амттай хоол хийхийг санал болгож байна.',
        appliedAt: '2024-06-08 11:00',
      },
    ],
  },
  {
    id: 'c6',
    name: 'Хүрэлбаатар',
    avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
    bio: 'Фитнесс, дасгал хөдөлгөөний талаарх богино хэмжээний бичлэгүүд болон хичээлүүд бэлтгэдэг.',
    skills: ['Дасгалжуулалт', 'Видео Монтаж', 'Сошиал Медиа'],
    tags: ['Фитнесс', 'Дасгал', 'Эрч хүч'],
    applicants: [
      {
        id: 'a8',
        name: 'Gym Equipment MGL',
        avatarUrl: 'https://randomuser.me/api/portraits/women/88.jpg',
        type: 'Sponsor',
        message: 'Таны дасгалын бичлэгүүдэд манай тоног төхөөрөмжийг ашиглах санал.',
        appliedAt: '2024-06-12 10:30',
      },
      {
        id: 'a9',
        name: 'Түвшин-Эрдэнэ',
        avatarUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
        type: 'Collab',
        message: 'Бид хоёр өөр төрлийн дасгалын дуэтийг хийж болох юм.',
        appliedAt: '2024-06-12 11:00',
      },
    ],
  },
  {
    id: 'c7',
    name: 'Идэр Оюун',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    bio: 'Боловсрол, карьер хөгжлийн чиглэлээр подкаст болон нийтлэл бэлтгэдэг.',
    skills: ['Подкаст', 'Контент Бичих', 'Мэдээлэл Шинжилгээ'],
    tags: ['Боловсрол', 'Карьер', 'Подкаст'],
    applicants: [
      {
        id: 'a10',
        name: 'Манлай Академи',
        avatarUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
        type: 'Sponsor',
        message: 'Манай сургалтын хөтөлбөрийг танилцуулахыг хүсэж байна.',
        appliedAt: '2024-06-13 15:00',
      },
    ],
  },
  {
    id: 'c8',
    name: 'Жаргал Сайхан',
    avatarUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
    bio: 'Санхүү, хөрөнгө оруулалтын талаар ойлгоход хялбар инфографик болон богино бичлэгүүд хийдэг.',
    skills: ['Санхүү', 'Инфографик', 'Мэдээлэл Шинжилгээ'],
    tags: ['Санхүү', 'Хөрөнгө Оруулалт', 'Боловсрол'],
    applicants: [], // No current applicants
  },
  {
    id: 'c9',
    name: 'Оргил Түвшин',
    avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    bio: 'Онлайн тоглоом болон стриминг контент үүсгэгч. Идэвхтэй фэнүүдийн баазтай.',
    skills: ['Стриминг', 'Тоглоомын Тойм', 'Видео Эдит'],
    tags: ['Тоглоом', 'Стример', 'Twitch'],
    applicants: [
      {
        id: 'a11',
        name: 'Game Zone Mongolia',
        avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
        type: 'Sponsor',
        message: 'Манай тоглоомын аксесуаруудыг сурталчлах санал.',
        appliedAt: '2024-06-14 19:30',
      },
    ],
  },
  {
    id: 'c10',
    name: 'Пүрэвсүрэн',
    avatarUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
    bio: 'Урлаг, гар урлалын чиглэлээр DIY (өөрийн гараар хийх) контент бэлтгэдэг. Инстаграм болон Pinterest-д идэвхтэй.',
    skills: ['Гар Урлал', 'Зураг Зурах', 'Инстаграм'],
    tags: ['Урлаг', 'DIY', 'Гар Урлал'],
    applicants: [
      {
        id: 'a12',
        name: 'Крафт Дэлгүүр',
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        type: 'Collab',
        message: 'Бидний материалыг ашиглан хамтарсан бичлэг хийхийг хүсэж байна.',
        appliedAt: '2024-06-15 09:00',
      },
      {
        id: 'a13',
        name: 'Монгол Оёдол',
        avatarUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        type: 'Message',
        message: 'Таны шинэ бүтээлийн зургийг илгээгээч.',
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
            ? 'Сэтгэгдэл Нуух' // Hide Applicants
            : `Сэтгэгдэл Үзэх (${creator.applicants.length})`} {/* View Applicants */}
        </button>
        <div className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">{creator.applicants.length}</span> Сэтгэгдэл
        </div>
      </div>
    </div>
    {expanded && (
      <div className="mt-6 border-t pt-4 space-y-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-lg">Ирсэн Сэтгэгдэлүүд</h4> {/* Applicants */}
        {creator.applicants.length === 0 ? (
          <div className="text-gray-500 text-sm">Одоогоор Сэтгэгдэл ирээгүй байна.</div>
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
              Идэвхтэй Контент Бүтээгчид 
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
                    Одоогоор идэвхтэй контент бүтээгч олдсонгүй.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}