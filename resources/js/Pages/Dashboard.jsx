import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia"; // Import Inertia

export default function Dashboard({ auth, myNews }) {
    useEffect(() => {
        if (!myNews) {
            Inertia.get("/dashboard");
        }
        return;
    }, []);

    const handleDelete = (newsId) => {
        if (confirm("Are you sure want to delete this news?")) {
            Inertia.delete(`/news/${newsId}`).then(() => {
                Inertia.reload();
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                {/* berita */}
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap items-start gap-4 mx-8 my-4">
                    {myNews && myNews.length > 0 ? (
                        myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-96 bg-base-100 shadow-xl mb-4"
                                >
                                    <figure>
                                        <img
                                            src={`/storage/news/${news.image}`}
                                            alt="image news"
                                        />
                                    </figure>
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
                                                    <Link href={route('news.edit', { news: news.id })} method="get" as="button">edit</Link>
                                                </div>
                                                <div className="badge bg-red-600 text-white">
                                                   <button onClick={() => handleDelete(news.id)}>delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="flex justify-center items-center">
                            You don't have any message
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
