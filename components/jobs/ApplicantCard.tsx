import { User } from '@/types/schema';
type Props = {
    user: User;
};
export function ApplicantCard({ user }: Props) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-2 flex items-center justify-between">
            <div>
                <div className="font-semibold">{user.name} {user.verified && <span className="text-green-500">✔️</span>}</div>
                <div className="text-xs text-gray-500">Rating: {user.rating} / 5</div>
                <div className="text-xs text-gray-500">Followers: {user.social.followers} | Engagement: {user.social.engagement}%</div>
            </div>
            <div className="text-xs text-blue-500">{user.social.twitter} {user.social.youtube}</div>
        </div>
    );
}