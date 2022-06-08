import React, {useEffect} from 'react';
import {ClipboardListIcon, FolderIcon, TrashIcon, XCircleIcon, XIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'
import {tokenValid} from "../../utils/token";
import axios from "axios";
import {useLocalStorage, useStore} from "../../store";


const ExpandingCards = ({query, deleteQuery}) => {
    const setQueries = useStore(state => state.setQueries)
    const token = useLocalStorage(store => store.token)
    async function setQueriesFun() {
        if (tokenValid(token)) {
            const response = await axios({
                url: "http://localhost:3001/api/data",
                method: "get",
                headers: {Authorization: "Bearer " + token}
            })
            setQueries(await response.data)
        } else {
            await router.push("/LandingPage")
        }
    }
    useEffect(() => {
        setQueriesFun().catch(err => console.log(err))
    }, [router, setQueries, token]);
    const router = useRouter()

    return (
        <li
            key={query.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
            <div className="flex-1 flex flex-col p-3 shadow-md">
                {/*<FolderIcon className="text-gray-400"/>*/}
                <img
                    className="mx-auto mt-2"
                    src={query.thumbnails[0]}
                    alt="Workflow"
                    width="180"
                    height="120"
                /><img
                    className="mx-auto mt-2"
                    src={query.thumbnails[1]}
                    alt="Workflow"
                    width="180"
                    height="120"
                /><img
                    className="mx-auto mt-2"
                    src={query.thumbnails[2]}
                    alt="Workflow"
                    width="180"
                    height="120"
                /><img
                    className="mx-auto mt-2"
                    src={query.thumbnails[3]}
                    alt="Workflow"
                    width="180"
                    height="120"
                />

                <h3 className="text-gray-900 text-md font-medium">{query.query}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Max Price:</dt>
                    <dd className="text-gray-500 text-sm">Max Price: {query.maxPrice}</dd>
                    <dt className="sr-only">Min Price:</dt>
                    <dd className="mt-3">
                <span className="text-gray-500 text-sm">
                  Min Price: {query.minPrice}
                </span>
                    </dd>
                    <dd className="mt-3">
                <span className="text-gray-500 text-sm">
                  Region: {query.region}
                </span>
                    </dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="-ml-px w-0 flex-1 flex bg-indigo-600 hover:bg-indigo-800 hover:text-white rounded-md">
                        <button
                            className=" relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white font-medium border border-transparent "
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
