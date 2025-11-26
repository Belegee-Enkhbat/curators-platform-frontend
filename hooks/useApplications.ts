import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Application, ApplicationStatus } from '../types/schema';
import { mockApplications } from '../data/mockData';
import { useAuthStore } from '../store/authStore';

export const useApplications = (jobId?: string) => {
  return useQuery({
    queryKey: ['applications', jobId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (jobId) {
        return mockApplications.filter(app => app.jobId === jobId);
      }
      
      return mockApplications;
    },
  });
};

export const useMyApplications = () => {
  const user = useAuthStore(state => state.user);
  
  return useQuery({
    queryKey: ['my-applications', user?.id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (user?.role === 'creator') {
        return mockApplications.filter(app => app.creatorId === user.id);
      }
      
      return [];
    },
    enabled: !!user && user.role === 'creator',
  });
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  
  return useMutation({
    mutationFn: async (data: { jobId: string; jobTitle: string; coverLetter: string; proposedBudget: number }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newApplication: Application = {
        id: Math.random().toString(36).substr(2, 9),
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        creatorId: user?.id || '',
        creatorName: user?.name || '',
        creatorAvatar: user?.avatar,
        coverLetter: data.coverLetter,
        proposedBudget: data.proposedBudget,
        status: 'pending',
        appliedAt: new Date(),
      };
      
      return newApplication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { applicationId: string; status: ApplicationStatus }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};