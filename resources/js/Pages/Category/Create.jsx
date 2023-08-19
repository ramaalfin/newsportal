import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia"; // Import Inertia
import React, { useState } from "react";

const CategoryCreate = (props) => {
    const [name, setName] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        Inertia.post("/category", {
            name: name
        });
        setIsNotif(true);
        setName("");
        setTimeout(() => {
            setIsNotif(false);
        }, 4000);
    }
    return(
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title}/>
            <AuthenticatedLayout
                user={props.auth.user}
                header={
                    <div className="flex items-center">
                        <Link
                            href={route("category.index")}
                            method="get"
                            as="button"
                            className="hover:text-slate-950"
                        >
                            Back
                        </Link>{" "}
                        <span className="mx-2">/</span>
                        <h2 className="font-semibold text-gray-800 leading-tight">
                            Create Category
                        </h2>
                    </div>
                }
            >
                <div className="max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {isNotif && (
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
                                <span>
                                    Category has been successfully created!!
                                </span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="m-2 input input-bordered w-full"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <button
                            className="m-2 btn btn-primary w-full"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default CategoryCreate;
