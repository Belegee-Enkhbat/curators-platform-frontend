import React, { useState } from 'react';
// MOCK_FILTERS-ийг шинэчилсэн датаг импортлох болно
import { MOCK_FILTERS } from '@/data/mockData';
import { ArrowRight } from '@/components/custom/icons';
import { Button } from '../ui/button';

interface JobSearchSidebarProps {
    activeProfession: string;
    onSelectProfession: (p: string) => void;
}

export const JobSearchSidebar: React.FC<JobSearchSidebarProps> = ({ activeProfession, onSelectProfession }) => {
    // Цалингийн слайдерт ашиглагдаж болзошгүй state-ууд (MOCK_JOBS датанд тохирсон)
    const [salaryMin, setSalaryMin] = useState(1.5); // 1.5 сая
    const [salaryMax, setSalaryMax] = useState(3.0); // 3.0 сая

    return (
            <div className="w-full max-w-sm p-6 space-y-8 bg-white border-r border-gray-200 sticky top-0 h-full overflow-y-auto">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-900">Хайлт</h2>
                    <input
                        type="text"
                        // Placeholder-ыг контент чиглэлд тохируулж өөрчлөв
                        placeholder="Контент зохиогч, Видео монтажер..."
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                {/* Хувийн Зөвлөмж / Personalized Recommendations */}
                <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50 flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 transition">
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full text-white font-bold">A</div>
                    <div className="text-sm">
                        <p className="font-semibold text-gray-900">Надад тохирсон</p>
                        <p className="text-xs text-gray-600">Хувийн зөвлөмжүүдийг харах</p> {/* Монгол орчуулга нэмэв */}
                    </div>
                </div>

                {/* Шүүлтүүрийн Хэсгүүд */}
                <div className="space-y-6">
                    {MOCK_FILTERS.map((section) => (
                        <div key={section.id} className="space-y-3 border-b border-gray-100 pb-4">
                            {/* Шинэчлэгдсэн шүүлтүүрүүдийн нэрс */}
                            <h3 className="text-base font-semibold text-gray-900">{section.label}</h3>
                            <div className={`flex flex-wrap ${section.type === 'tag' ? 'gap-2' : 'space-y-2'}`}>
                                {section.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => onSelectProfession(option)}
                                        // "Бүтээгдэхүүн"-ийг эхний элементтэй жишихээ болиод, зөвхөн activeProfession-той жишнэ
                                        className={`${section.type === 'tag' ? 'px-3 py-1 text-sm rounded-full border' : 'w-full py-2 px-3 text-left rounded-lg'} ${option === activeProfession ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'} transition duration-150 text-sm`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                    }
                    <div>
                        {/* Цалингийн Хэсэг */}
                        <div className="space-y-3">
                            <h3 className="text-base font-semibold text-gray-900">Цалингийн Хүрээ (Сая ₮)</h3>
                            {/* Цалингийн шошгуудыг MOCK_JOBS датанд тохируулан өөрчлөв */}
                            <div className="flex justify-between text-gray-500 text-xs">
                                <span>{salaryMin} сая</span>
                                <span>{salaryMax}+ сая</span>
                            </div>
                            {/* Энд цалингийн слайдерийн UI хэвээр үлдсэн */}
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
                        
                        {/* Компаниуд Хэсэг */}
                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                variant="ghost"
                                className="flex justify-between items-center w-full py-2 text-base font-semibold text-gray-900 hover:text-indigo-600 transition p-0 hover:bg-white" // Ghost variant-ийг тохируулсан
                            >
                                Компаниуд
                                <ArrowRight className="text-gray-400" />
                            </Button>
                        </div>
                    </div>
                </div >
            </div >
    );
};