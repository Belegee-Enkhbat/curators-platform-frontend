'use client';
import { useState } from 'react';
import { MOCK_JOBS } from '@/data/mockData';
import { JobCard } from '@/components/jobs/JobCard';
import { JobSearchSidebar } from '@/components/jobs/JobSearchSidebar';
import Header from '@/components/custom/header';

export default function OrganizationJobDashboard() {
    const [activeProfession, setActiveProfession] = useState('Бүтээгдэхүүн');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto flex">
                <div className="w-1/3 min-w-[300px] border-r border-gray-200 bg-white">
                    <JobSearchSidebar
                        activeProfession={activeProfession}
                        onSelectProfession={setActiveProfession}
                    />
                </div>
                <div className="flex-1 min-h-screen bg-white">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">
                            {MOCK_JOBS.length} Jobs
                        </h2>
                        <div className="space-y-2">
                            {MOCK_JOBS.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}