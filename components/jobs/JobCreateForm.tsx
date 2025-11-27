import { Button } from '@/components/ui/button';
import { useState } from 'react';
type Props = {
    onCreate: (job: { title: string; description: string; organizationId: string }) => void;
    organizationId: string;
};
export function JobCreateForm({ onCreate, organizationId }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onCreate({ title, description, organizationId });
                setTitle('');
                setDescription('');
            }}
            className="bg-white rounded-lg shadow p-6 mb-6"
        >
            <h3 className="text-lg font-bold mb-2">Create New Job</h3>
            <input
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <Button type="submit" className="w-full">Create Job</Button>
        </form>
    );
}

