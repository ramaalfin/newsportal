import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user}/>
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
                <NewsList news={props.news.data} />
            </div>
            <div className="row mt-3 flex justify-center items-center">
                <Paginator news={props.news}/>
            </div>
        </div>
    );
}
