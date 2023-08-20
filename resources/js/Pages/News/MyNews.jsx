import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia"; // Import Inertia
import Paginator from "@/Components/Homepage/Paginator";

export default function MyNews({ auth, myNews, flash }) {
    const [deleteMessage, setDeleteMessage] = useState(flash.message);
    useEffect(() => {
        if (deleteMessage) {
            const timeout = setTimeout(() => {
                setDeleteMessage("");
            }, 2000);
            return () => clearTimeout(timeout);
        }
    });

    const handleDelete = (id) => {
        if (confirm("Are you sure want to delete this news?")) {
            Inertia.delete(`/news/${id}`).then(() => {
                Inertia.reload({
                    only: ["flash"],
                });
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My News
                </h2>
            }
        >
            <Head title="My News" />

            <div className="py-4">
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap items-start gap-4 mx-8 my-4">
                    {deleteMessage && (
                        <div className="alert alert-success mb-4">
                            {deleteMessage}
                        </div>
                    )}
                    {myNews && myNews.data.length > 0 ? (
                        myNews.data.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-96 bg-base-100 shadow-xl mb-4"
                                >
                                    {news.image && (
                                        <figure>
                                            <img
                                                src={`/storage/news/${news.image}`}
                                                alt="image news"
                                            />
                                        </figure>
                                    )}
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="flex justify-between">
                                            <div className="">
                                                <div className="badge">
                                                    {news.user.name}
                                                </div>
                                                <div className="badge">
                                                    {news.category.name}
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="badge bg-warning">
                                                    <Link
                                                        href={route(
                                                            "news.edit",
                                                            { news: news.id }
                                                        )}
                                                        method="get"
                                                        as="button"
                                                    >
                                                        edit
                                                    </Link>
                                                </div>
                                                <div className="badge bg-red-600 text-white">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                news.id
                                                            )
                                                        }
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="flex justify-center items-center">
                            You don't have any News
                        </p>
                    )}
                </div>
            </div>
            <div className="row mt-3 flex justify-center items-center">
                <Paginator news={myNews} />
            </div>
        </AuthenticatedLayout>
    );
}
