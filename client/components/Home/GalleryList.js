import React from 'react';
import {useLocalStorage, useStore} from '../../store';
import axios from "axios";
import {useRouter} from "next/router";


const GalleryList = () => {
    const router = useRouter();
    const queries = useStore(state => state.queries);

    const setArticleToDisplay = useLocalStorage(store => store.setArticleToDisplay)
    const deleteQuery = async (id) => {
        await axios.delete(`http://localhost:3001/api/search/${id}`)
    }
    const displayArticle = async (id) => {
        const result = await axios.get(`http://localhost:3001/api/article/${id}`)
        return result.data
    }
    return (
        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="sr-only">
                Recently viewed
            </h2>
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
            >
                {queries.map((file) => (
                    <div key={file.id}
                         className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 shadow-lg rounded-xl">

                        <li className="relative">
                            <div className="py-2 flex justify-between text-md ">
                                <dt className="text-black-900 font-bold "> {file.query}</dt>
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await deleteQuery(file.id)

                                    }}
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Delete Search
                                </button>
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        let articles = await displayArticle(file.id)
                                        setArticleToDisplay(articles)
                                        await router.push('/Article')
                                    }}
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    See details
                                </button>
                            </div>

                        </li>
                    </div>
                ))}
            </ul>
        </section>
    );
};

export default GalleryList;
