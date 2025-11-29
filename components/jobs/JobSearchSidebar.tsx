import React, { useState } from 'react';
import { MOCK_FILTERS } from '@/data/mockData';
import { ArrowRight } from '@/components/custom/icons';
import { Button } from '../ui/button';

interface JobSearchSidebarProps {
    activeProfession: string;
    onSelectProfession: (p: string) => void;
    // Optionally, you can add onTabChange if you want to control the main content from parent
}

export const JobSearchSidebar: React.FC<JobSearchSidebarProps> = ({
    activeProfession,
    onSelectProfession,
    // onTabChange,
}) => {
    const [salaryMin, setSalaryMin] = useState(1.5);
    const [salaryMax, setSalaryMax] = useState(3.0);

    // Tab state for sidebar navigation
    const [activeTab, setActiveTab] = useState<'jobs' | 'proposals' | 'collab'>('jobs');

    // Proposal form state
    const [form, setForm] = useState({
        title: '',
        description: '',
        lookingFor: 'Sponsor',
        tags: '',
    });

    function handleProposalSubmit(e: React.FormEvent) {
        e.preventDefault();
        // For demo: just alert, or you can lift state up to parent
        alert('Proposal submitted: ' + JSON.stringify(form));
        setForm({ title: '', description: '', lookingFor: 'Sponsor', tags: '' });
    }

    return (
        <div className="w-full max-w-sm p-6 space-y-8 bg-white border-r border-gray-200 sticky top-0 h-full overflow-y-auto">
            {/* Tabbed navigation */}
            {/* The rest of your search/filter UI */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900">Хайлт</h2>
                <input
                    type="text"
                    placeholder="Контент зохиогч, Видео монтажер..."
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
                {MOCK_FILTERS.map((section) => (
                    <div key={section.id} className="space-y-3 border-b border-gray-100 pb-4">
                        <h3 className="text-base font-semibold text-gray-900">{section.label}</h3>
                        <div className={`flex flex-wrap ${section.type === 'tag' ? 'gap-2' : 'space-y-2'}`}>
                            {section.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => onSelectProfession(option)}
                                    className={`${section.type === 'tag' ? 'px-3 py-1 text-sm rounded-full border' : 'w-full py-2 px-3 text-left rounded-lg'} ${option === activeProfession ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'} transition duration-150 text-sm`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {/* <div>
                    <div className="space-y-3">
                        <h3 className="text-base font-semibold text-gray-900">Цалингийн Хүрээ (Сая ₮)</h3>
                        <div className="flex justify-between text-gray-500 text-xs">
                            <span>{salaryMin} сая</span>
                            <span>{salaryMax}+ сая</span>
                        </div>
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
                    {/* Companies Section */}
                {/* <div className="pt-4 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-900 hover:text-indigo-600 transition p-0 hover:bg-white"
                        >
                            Компаниуд
                            <ArrowRight className="text-gray-400" />
                        </Button>
                    </div> */}
                {/* </div>  */}
            </div>
        </div>
    );
};