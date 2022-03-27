import React from 'react';
import {FolderIcon, XIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'

const ExpandingCards = ({query, displayArticle, setArticleToDisplay, deleteQuery}) => {
    const router = useRouter()
    return (
        <li
            key={query.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
            <div className="flex-1 flex flex-col p-8">
                <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                     src="https://p1.clipartsky.com/preview/431/740/60/pop-folders-mini-yellow-folder-icon-art-png-clipart.jpg"
                     alt=""/>
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{query.query}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Max Price:</dt>
                    <dd className="text-gray-500 text-sm">Max Price: {query.maxPrice}</dd>
                    <dt className="sr-only">Min Price:</dt>
                    <dd className="mt-3">
                <span className="text-gray-500 text-sm">
                  Min Price: {query.minPrice}
                </span>
                    </dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex bg-indigo-800 hover:bg-indigo-600 hover:text-white">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                let articles = await displayArticle(query.id)
                                setArticleToDisplay(articles)
                                await router.push('/Article')
                            }}
                        >
                            <FolderIcon className="w-5 h-5 text-white" aria-hidden="true"/>
                            <span className="ml-3">See Details</span>
                        </button>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex bg-red-500 hover:bg-red-700 hover:text-white">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await deleteQuery(query.id)

                            }}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-black hover:text-white font-medium border border-transparent rounded-br-lg "
                        >
                            <XIcon className="w-5 h-5 text-red-900 " aria-hidden="true"/>
                            <span className="ml-3 font-medium">Delete Query</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
};

export default ExpandingCards;
