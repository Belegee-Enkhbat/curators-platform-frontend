import type { UserRole, JobStatus, Platform, AgeGroup } from './enums.ts';
import type { ApplicationStatus } from './enums.ts';

export type { ApplicationStatus };

// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface ContentCreator extends User {
  role: 'creator';
  bio?: string;
  location?: string;
  skills: string[];
  portfolio: string[];
  socialAccounts: SocialAccount[];
  analytics: SocialAnalytics;
  targetAudience: AudienceData;
}

export interface Organization extends User {
  role: 'organization';
  companyName: string;
  industry?: string;
  website?: string;
  description?: string;
}

export interface SocialAccount {
  platform: Platform;
  username: string;
  followers: number;
  verified: boolean;
}

export interface SocialAnalytics {
  totalFollowers: number;
  engagementRate: number;
  averageReach: number;
  topPlatform: Platform;
}

export interface AudienceData {
  ageGroups: Record<AgeGroup, number>;
  topLocations: string[];
  interests: string[];
}

// Job types
export interface Job {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  deadline: Date;
  requiredSkills: string[];
  status: JobStatus;
  createdAt: Date;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  coverLetter: string;
  proposedBudget: number;
  status: ApplicationStatus;
  appliedAt: Date;
}

// Props types
export interface AuthFormProps {
  role: UserRole;
  onSubmit: (data: LoginData | RegisterData) => void;
  isLoading?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  companyName?: string;
}

export interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<JobFormData>;
}

export interface JobFormData {
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  deadline: Date;
  requiredSkills: string[];
}

export interface DashboardStatsProps {
  stats: DashboardStats;
}

export interface DashboardStats {
  totalJobs?: number;
  activeJobs?: number;
  totalApplications?: number;
  pendingApplications?: number;
  totalFollowers?: number;
  engagementRate?: number;
}