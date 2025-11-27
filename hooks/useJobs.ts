// Update the import to match the actual export from mockData.ts
import { MOCK_JOBS } from "@/data/mockData";
import { Job } from "@/types/schema";
import { useState } from "react";
export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const createJob = (job: Omit<Job, "id" | "createdAt">) => {
    const newJob: Job = {
      ...job,
      id: `job${jobs.length + 1}`,
    };
    setJobs((prev) => [newJob, ...prev]);
  };
  return { jobs, createJob };
}
