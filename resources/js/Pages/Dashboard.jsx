import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia

export default function Dashboard({ auth, categories, props }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = async () => {
        const data = {
            title: title,
            description: description,
            category_id: selectedCategory,
        };

        Inertia.post('/news', data);
        setIsNotif(true);
        setTitle('');
        setDescription('');
        setSelectedCategory('');
        setTimeout(() => {
            setIsNotif(false);
        }, 4000);
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isNotif && (
                            <div className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>News has been successfully created!!</span>
                            </div>
                        )}
                        <input type="text" placeholder="Title" className="m-2 input input-bordered w-full" value={title} onChange={(title) => setTitle(title.target.value)}/>
                        <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full" value={description} onChange={(description) => setDescription(description.target.value)} />

                        <select className="m-2 select select-ghost w-full" value={selectedCategory} onChange={(selectedCategory) => setSelectedCategory(selectedCategory.target.value)}>
                            <option value="" disabled>Choice the category</option>
                            {categories.map((data) => (
                                <option key={data.id} value={data.id}>
                                {data.name}
                                </option>
                            ))}
                        </select>

                        <button className='m-2 btn btn-primary w-full' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
