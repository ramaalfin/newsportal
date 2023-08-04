const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div key={ i } className="card w-full lg:w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://picsum.photos/300/200"
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{data.user.email}</div>
                        <div className="badge badge-inline bg-slate-900 text-white">{data.category.name}</div>
                    </div>
                </div>
            </div>
        )
    })
}

const noNews = () => {
    return (
        <div className="">Currently no news available</div>
    )
}

const NewsList = ({ news }) => {
    return !news ? noNews() : isNews(news)
};
export default NewsList;
