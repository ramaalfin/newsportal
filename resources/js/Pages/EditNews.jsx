import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title);
    const [description, setDescription] = useState(props.myNews.description);
    const [category, setCategory] = useState(props.myNews.category_id);
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        Inertia.put(`/news/${props.myNews.id}`, {
            title: title,
            description: description,
            category_id: category
        }).then(() => {
            setIsNotif(true);
            setTimeout(() => {
                setIsNotif(false)
            }, 4000);
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex m-6">
                <Link href={route('dashboard')} method="get" as="button">Dashboard</Link> <p>/Edit</p>
            </div>
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl mb-4">
                <h1 className="p-4 text-2xl">Edit Berita</h1>
                <div className="card-body">
                    {props.flash.message && (
                        <div className="alert alert-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{props.flash.message}!!</span>
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Title"
                        className="m-2 input input-bordered w-full"
                        defaultValue={props.myNews.title}
                        onChange={(title) => setTitle(title.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="m-2 input input-bordered w-full"
                        defaultValue={props.myNews.description}
                        onChange={(description) =>
                            setDescription(description.target.value)
                        }
                    />

                    <select
                        className="m-2 select select-bordered w-full"
                        defaultValue={props.myNews.category_id}
                        onChange={(category) =>
                            setCategory(category.target.value)
                        }
                    >
                        <option value="" disabled>
                            Choice the category
                        </option>
                        {props.categories.map((data) =>
                            data.id == props.myNews.category_id ? (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            ) : (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            )
                        )}
                    </select>

                    <button
                        className="m-2 btn btn-primary w-full"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
