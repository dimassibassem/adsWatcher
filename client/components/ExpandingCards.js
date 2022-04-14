import React from 'react';
import {ClipboardListIcon, FolderIcon, TrashIcon, XCircleIcon, XIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'

const ExpandingCards = ({query,deleteQuery}) => {
    const router = useRouter()

    return (
        <li
            key={query.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
            <div className="flex-1 flex flex-col p-3 shadow-md">
                <FolderIcon className="text-gray-400"/>
                <h3 className="text-gray-900 text-sm font-medium">{query.query}</h3>
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
                    <div className="-ml-px w-0 flex-1 flex bg-indigo-600 hover:bg-indigo-800 hover:text-white rounded-md">
                        <button
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white font-medium border border-transparent "
                            onClick={async (e) => {
                                e.preventDefault();
                                await router.push(`/Article/${query.id}`)
                            }}
                        >
                            <ClipboardListIcon className="w-5 h-5 text-white" aria-hidden="true"/>
                            <span className="ml-3 font-medium">See Details</span>
                        </button>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex bg-red-500 hover:bg-red-700 hover:text-white rounded-md">
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await deleteQuery(query.id)
                            }}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-black hover:text-white font-medium border border-transparent "
                        >
                            <TrashIcon className="w-5 h-5 text-red-900 " aria-hidden="true"/>
                            <span className="ml-3 font-medium">Delete Query</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
};

export default ExpandingCards;
