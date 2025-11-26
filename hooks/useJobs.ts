import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Job, JobFormData } from '../types/schema';
import { mockJobs } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

export const useJobs = (filters?: { status?: string; search?: string }) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let jobs = [...mockJobs];
      
      if (filters?.status && filters.status !== 'all') {
        jobs = jobs.filter(job => job.status === filters.status);
      }
      
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search)
        );
      }
      
      return jobs;
    },
  });
};

export const useMyJobs = () => {
  const user = useAuthStore(state => state.user);
  
  return useQuery({
    queryKey: ['my-jobs', user?.id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (user?.role === 'organization') {
        return mockJobs.filter(job => job.organizationId === user.id);
      }
      
      return [];
    },
    enabled: !!user && user.role === 'organization',
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  
  return useMutation({
    mutationFn: async (data: JobFormData) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newJob: Job = {
        id: Math.random().toString(36).substr(2, 9),
        organizationId: user?.id || '',
        organizationName: user?.name || '',
        title: data.title,
        description: data.description,
        budget: { min: data.budgetMin, max: data.budgetMax },
        deadline: data.deadline,
        requiredSkills: data.requiredSkills,
        status: 'active',
        createdAt: new Date(),
        applicationsCount: 0,
      };
      
      return newJob;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
    },
  });
};