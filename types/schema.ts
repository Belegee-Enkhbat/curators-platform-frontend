import { UserType } from "./enums";
export interface User {
  id: string;
  name: string;
  type: UserType;
  verified: boolean;
  rating: number;
  social: {
    twitter: string;
    youtube: string;
    followers: number;
    engagement: number;
  };
}

export interface Application {
  id: string;
  jobId: string;
  creatorId: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

export interface Company {
id: string;
name: string;
logoUrl: string;
location: string;
}

export interface Job {
  id: string;                  // Ажлын ID
  title: string;               // Ажлын нэр
  description: string;         // Ажлын дэлгэрэнгүй тайлбар
  requirements: string[];      // Ажлын шаардлагууд
  location: string;            // Ажлын байршил
  jobType: string;             // Ажлын төрөл (Гэрээт, Бүтэн цагаар гэх мэт)
  salaryMin: string;           // Доод цалин
  salaryMax: string;           // Дээд цалин
  companyId: string;           // Компаний ID
  applicants: number;          // Өргөдөл гаргасан хүний тоо
  postedAgo: string;           // Хэзээ байршуулсан тухай текст
  tags: string[];              // Тэмдэглэгээ / Category / статус
}


export interface FilterSection {
id: string;
label: string;
options: string[];
type?: 'button' | 'tag';
}



export type AnalysisResult = {
    contentTitle: string;
    contentPlatform: string;
    aiRoast: string;
    keyMetrics: {
        totalViews: string;
        avgWatchTime: string;
        saveRate: string;
        conversionRate: string;
    };
    platformReach: {
        name: string;
        reach: number;
        color: string;
    }[];
    targetAge: {
        range: string;
        engagement: number;
        color: string;
    }[];
};
