import React, {useEffect} from 'react';
import {classNames} from "../../utils";
import {useLocalStorage, useStore} from '../../store';
import LinkButton from "./LinkButton";
import axios from "axios";
import {useRouter} from "next/router";


const GalleryList = () => {
    const router = useRouter();
    // const source = useStore(store => store.source)
    //
    // const categoryDisplayNames = useStore(store => store.categoryDisplayNames)
     const setQueries = useStore(state => state.setQueries);
     const queries = useStore(state => state.queries);
    //
    //
    // const formatedDate = (timestamp) => {
    //     let ts = new Date(timestamp * 1000);
    //     let month = ts.getMonth() + 1;
    //     let year = ts.getFullYear();
    //     let date = ts.getDate();
    //     return `${date}/${month}/${year}`
    // }
    // const distance = (file) => {
    //     if (file.distance !== 0) {
    //         return <div className="py-3 flex justify-between text-sm font-medium">
    //             <dt className="text-gray-500">Distance</dt>
    //             <dd className="text-gray-900">{file.distance} KM</dd>
    //         </div>
    //     } else return <div/>
    // }
const setArticleToDisplay = useStore(store => store.setArticleToDisplay)
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
                {queries.map((file, index) => (
                    <div key={file.id}
                         className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 shadow-lg rounded-xl">

                        <li className="relative">
                            <div className="">
                                <div className="">
                                    {/*<div*/}
                                    {/*    className={classNames(*/}
                                    {/*        file.current*/}
                                    {/*            ? 'ring-2 ring-offset-2 ring-indigo-500'*/}
                                    {/*            : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',*/}
                                    {/*        'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'*/}
                                    {/*    )}*/}
                                    {/*>*/}


                                    {/*<img*/}
                                    {/*    src={file.thumbnail}*/}
                                    {/*    alt=""*/}
                                    {/*    className={classNames(*/}
                                    {/*        file.current ? '' : 'group-hover:opacity-75',*/}
                                    {/*        'object-cover pointer-events-none'*/}
                                    {/*    )}*/}
                                    {/*/>*/}


                                    {/*<button type="button"*/}
                                    {/*        className="absolute inset-0 focus:outline-none"*/}
                                    {/*>*/}

                                    {/*    <span className="sr-only">View details for {file.title}</span>*/}
                                    {/*</button>*/}
                                    {/*</div>*/}
                                    {/*<div className="py-3 flex justify-between text-md ">*/}
                                    {/*    <dt className="text-black-900 font-bold "> {file.title}</dt>*/}
                                    {/*</div>*/}
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
                                                const result = await displayArticle(file.id)
                                                setArticleToDisplay(result)
                                                await router.push('/Article/')
                                            }}
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            See details
                                        </button>
                                    </div>

                                    {/*<div className="py-3 flex justify-between text-sm font-medium">*/}
                                    {/*    <dt className="text-gray-500">Price</dt>*/}
                                    {/*    <dd className="text-gray-900">{file.price} TND</dd>*/}
                                    {/*</div>*/}
                                    {/*<div className="py-3 flex justify-between text-sm font-medium">*/}
                                    {/*    <dt className="text-gray-500">Category</dt>*/}
                                    {/*    <dd className="text-gray-900">{categoryDisplayNames[file.categoryId - 1].name}</dd>*/}
                                    {/*</div>*/}
                                    {/*<div className="py-3 flex justify-between text-sm font-medium">*/}
                                    {/*    <dt className="text-gray-500">Location</dt>*/}
                                    {/*    <dd className="text-gray-900">{file.location}</dd>*/}
                                    {/*</div>*/}
                                    {/*<div className="py-3 flex justify-between text-sm font-medium">*/}
                                    {/*    <dt className="text-gray-500">Posted at</dt>*/}
                                    {/*    <dd className="text-gray-900">{formatedDate(file.timestamp)}</dd>*/}
                                    {/*</div>*/}
                                    {/*{distance(file)}*/}

                                    {/*<div className="pt-3">*/}
                                    {/*    <h3 className="font-medium text-gray-900">Description</h3>*/}
                                    {/*    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">*/}
                                    {/*        <div className="py-3 flex justify-between text-sm font-medium">*/}

                                    {/*            <dd className="text-gray-500">{file.description}</dd>*/}
                                    {/*        </div>*/}
                                    {/*    </dl>*/}
                                    {/*</div>*/}
                                </div>
                                {/*<div className="">*/}
                                {/*    <LinkButton source={source} currentFile={file}/>*/}
                                {/*</div>*/}
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </section>
    );
};

export default GalleryList;
