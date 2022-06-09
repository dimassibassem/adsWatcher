import React, {useEffect} from 'react';
import {ClipboardListIcon, DotsVerticalIcon, FolderIcon, TrashIcon, XCircleIcon, XIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'
import {tokenValid} from "../../utils/token";
import axios from "axios";
import {useLocalStorage, useStore} from "../../store";
import SearchesThumbnails from "../SearchesThumbnails";

// const ExpandingCards = ({query, deleteQuery}) => {
//     const router = useRouter()
//     const setQueries = useStore(state => state.setQueries)
//     const token = useLocalStorage(store => store.token)
//
//     async function setQueriesFun() {
//         if (tokenValid(token)) {
//             const response = await axios({
//                 url: "http://localhost:3001/api/data",
//                 method: "get",
//                 headers: {Authorization: "Bearer " + token}
//             })
//             setQueries(await response.data)
//         } else {
//             await router.push("/LandingPage")
//         }
//     }
//
//     useEffect(() => {
//         setQueriesFun().catch(err => console.log(err))
//     }, [router, setQueries, token]);
//
//
//     return (
//         <li
//             key={query.id}
//             className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
//         >
//             <div className="flex-1 flex flex-col- p-3 shadow-md">
//                 <div className="place-content-start bg-amber-900">
//                     <SearchesThumbnails query={query}/>
//                 </div>
//                 <h3 className="text-gray-900 text-md font-medium">{query.query}</h3>
//                 <dl className="mt-1 flex-grow flex flex-col justify-between">
//                     <dt className="sr-only">Max Price:</dt>
//                     <dd className="text-gray-500 text-sm">Max Price: {query.maxPrice}</dd>
//                     <dt className="sr-only">Min Price:</dt>
//                     <dd className="mt-3">
//                 <span className="text-gray-500 text-sm">
//                   Min Price: {query.minPrice}
//                 </span>
//                     </dd>
//                     <dd className="mt-3">
//                 <span className="text-gray-500 text-sm">
//                   Region: {query.region}
//                 </span>
//                     </dd>
//                 </dl>
//             </div>
//             <div>
//                 <div className="-mt-px flex divide-x divide-gray-200">
//                     <div
//                         className="-ml-px w-0 flex-1 flex bg-indigo-600 hover:bg-indigo-800 hover:text-white rounded-md">
//                         <button
//                             className=" relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-white font-medium border border-transparent "
//                             onClick={async (e) => {
//                                 e.preventDefault();
//                                 await router.push(`/Article/${query.id}`)
//                             }}
//                         >
//                             <ClipboardListIcon className="w-5 h-5 text-white" aria-hidden="true"/>
//                             <span className="ml-3 font-medium">See Details</span>
//                         </button>
//                     </div>
//                     <div className="-ml-px w-0 flex-1 flex bg-red-500 hover:bg-red-700 hover:text-white rounded-md">
//                         <button
//                             onClick={async (e) => {
//                                 e.preventDefault();
//                                 await deleteQuery(query.id)
//                             }}
//                             className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-black hover:text-white font-medium border border-transparent "
//                         >
//                             <TrashIcon className="w-5 h-5 text-red-900 " aria-hidden="true"/>
//                             <span className="ml-3 font-medium">Delete Query</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </li>
//     )
// };

import {MailIcon, PhoneIcon} from '@heroicons/react/solid'
import {classNames} from "../../utils";


export default function ExpandingCards() {
    const queries = useStore(state => state.queries);
    const setQueries = useStore(state => state.setQueries);
    const token = useLocalStorage(state => state.token);
    const router = useRouter()

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
    const deleteQuery = async (id) => {
        await axios.delete(`http://localhost:3001/search/${id}`)
    }
    const deleteQueryHandler = async (id) => {
        await deleteQuery(id);
        setQueries(queries.filter(query => query.id !== id));
    }

    useEffect(() => {
        setQueriesFun().catch(err => console.log(err))
    }, [router, setQueries, token]);
    console.log(queries)
    return (
        <ul role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {queries.map((query) => (
                <li key={query.id} className="col-span-1 flex shadow-sm rounded-md">
                    <div className="flex-1 flex justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md ">
                        <div className="flex-1 pr-2 text-sm ">
                                <SearchesThumbnails query={query}/>

                        </div>
                        <div className="flex-shrink-0 ">
                                <p className="text-gray-500 text-sm">query: {query.query}</p>
                                <p className="text-gray-500 text-sm">maxPrice: {query.maxPrice}</p>
                                <p className="text-gray-500 text-sm">minPrice: {query.minPrice}</p>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await deleteQueryHandler(query.id)
                                }}
                                className="inline-flex items-center justify-center rounded-xl py-1 pr-1 text-sm text-black hover:text-red-800 hover:bg-red-300 font-medium border border-transparent "
                            >
                                <TrashIcon className="w-5 h-5 text-red-900 " aria-hidden="true"/>
                                <span className="ml-3 font-medium text-red-900">Delete Query</span>
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}


// export default ExpandingCards;
