import { Job } from '@/types/schema';
import { MOCK_COMPANIES } from '@/data/mockData';
import { Badge } from '@/components/custom/badge';
import { Heart, Share, Clock } from '@/components/custom/icons';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const company = MOCK_COMPANIES.find(c => c.id === job.companyId);
    if (!company) return null;

    const salaryDisplay = `${job.salaryMin}₮ - ${job.salaryMax}₮ / сард`;


    const getBadge = (tag: string) => {

        if (tag.toLowerCase().includes('шинэ')) {
            return <Badge variant="urgent" key={tag}>{tag}</Badge>;
        }
        if (tag.toLowerCase().includes('remote')) {
            return <Badge variant="secondary" key={tag} size="large">{tag}</Badge>;
        }
        if (tag.toLowerCase().includes('trending')) {
            return <Badge variant="hot" key={tag}>{tag}</Badge>;
        }
        return <Badge variant="outline" key={tag}>{tag}</Badge>;
    };

    return (

        <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-xl hover:shadow-md transition duration-300 ease-in-out cursor-pointer group">

            <div className="flex justify-between items-start space-x-4">

                <div className="flex items-start">
                    <div className="h-12 w-12 shrink-0 mr-4 flex items-center justify-center rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                        <span className="text-xs text-gray-400">Лого</span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                            {job.title}
                        </h3>
                        <p className="text-sm text-indigo-700 font-medium mt-1">
                            {company.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-400 shrink-0">
                    <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
                    <Share className="w-5 h-5 hover:text-indigo-600 transition-colors" />
                </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between border-t border-dashed border-gray-100 pt-4">

                <div className="flex items-center space-x-6 text-sm">
                    <p className="text-lg font-bold text-indigo-600">
                        {salaryDisplay}
                    </p>

                    <span className="text-gray-500 hidden md:inline">•</span>

                    <div className="flex items-center space-x-1 text-gray-500">
                        <span className="font-medium">{job.location}</span>
                        <span className="text-gray-300">•</span>
                        <span>{job.jobType}</span>
                    </div>
                </div>

                <div className="mt-3 md:mt-0 flex flex-wrap items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-2 mr-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-600">{job.applicants} анкет</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{job.postedAgo}</span>
                    </div>
                    <div className="flex space-x-2">
                        {job.tags.map(getBadge)}
                    </div>
                </div>
            </div>
        </div>
    );
};