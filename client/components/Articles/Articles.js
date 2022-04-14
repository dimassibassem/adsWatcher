import React from 'react';
import {useLocalStorage, useStore} from "../../store";
import {classNames} from "../../utils";
import {useRouter} from "next/router";
import {ImageWithLoading} from "../ImageWithLoading";

const Articles = ({articleToDisplay}) => {
    const router = useRouter()
    // let articleToDisplay = useStore(state => state.articleToDisplay);
    const token = useLocalStorage(state => state.token);
    const setMoreImages = useStore(state => state.setMoreImages);
    const setCurrentFile = useStore(state => state.setCurrentFile);
    const currentFile = useStore(state => state.currentFile);

    const isCurrentArticle = (article) => {
        return currentFile && article && article.id === currentFile.id;
    }

    // articleToDisplay = articleToDisplay.filter(async article => (await axios.get(article.thumbnail)).status === 200);
    return (
        <div>
            <section className="mt-8 pb-16 t" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                    Recently viewed
                </h2>
                <ul
                    role="list"
                    className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-10"
                >

                    {articleToDisplay && articleToDisplay.map((article) => (
                        <li key={article.id} className="relative ">
                            <div
                                className={classNames(
                                    isCurrentArticle(article)
                                        ? 'ring-2 ring-offset-2 ring-indigo-500'
                                        : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                                    'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                                )}
                            >
                                {/*<ImageWithLoading src={article.thumbnail}/>*/}
                                <img
                                    src={article.thumbnail}
                                    alt=""
                                    className={classNames(
                                        article.current ? '' : 'group-hover:opacity-75',
                                        'object-cover pointer-events-none'
                                    )}
                                />

                                <button type="button"
                                        className="absolute inset-0 focus:outline-none"
                                        onClick={async () => {
                                            setCurrentFile(article)
                                            await setMoreImages(article, token)
                                        }}>

                                    <span className="sr-only">View details for {article.title}</span>
                                </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {article.title}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">{article.price === 0 ? "" : article.price + " TND"}</p>

                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
};

export default Articles;
