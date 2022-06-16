import {TrashIcon} from "@heroicons/react/solid";
import Link from "next/link";


export default function History({query, deleteQueryHandler}) {
    return (

        <div className="max-w-xl mx-auto pt-2 pb-10 px-20 ">
            <div className="flex items-center justify-between space-x-6">

            </div>
            <div className="mt-6 grid grid-cols-1 grid-rows-1 gap-x-2 gap-y-4 sm:grid-cols-1 sm:gap-y-2 lg:grid-cols-1">
                <button onClick={async () => {
                    await deleteQueryHandler(query.id)
                }}>
                    <div className=" z-10 absolute bg-gray-50">
                        <TrashIcon className="w-5 h-5 text-red-900" aria-hidden="true"/>
                    </div>
                </button>
                <div className="relative group">
                    <div className="rounded-lg overflow-hidden ">
                        <div className="grid grid-cols-2 relative group gap-x-4 gap-y-4">
                            <img src={query.thumbnails[0]} alt=""
                                 className="object-center object-cover rounded-lg max-h-20 max-w-20"/>
                            <img src={query.thumbnails[1]} alt=""
                                 className="object-center object-cover rounded-lg max-h-20 max-w-20"/>
                            <img src={query.thumbnails[2]} alt=""
                                 className="object-center object-cover rounded-lg max-h-20 max-w-20"/>
                            <img src={query.thumbnails[3]} alt=""
                                 className="object-center object-cover rounded-lg max-h-20 max-w-20"/>
                        </div>
                        <div className="flex items-end opacity-0 pt-2  group-hover:opacity-100 " aria-hidden="true">
                            <div
                                className="w-full bg-gray-200 bg-opacity-75 hover:cursor-pointer backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900  text-center ">
                                ADs for {query.query}

                            </div>
                        </div>
                    </div>
                    <div
                        className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                        <h3>
                            <Link href={'/Article/'+query.id} passHref >
                            <a>
                                <span aria-hidden="true" className="absolute inset-0"/>
                            </a>
                            </Link>
                        </h3>

                    </div>
                    <div className="grid grid-cols-2 relative group gap-x-2 pb-4">
                        <p className="mt-1 text-sm text-gray-500">{query.minPrice ? query.minPrice : "0"} ~ {query.maxPrice ? query.maxPrice : "no limit"}</p>
                        <p className="mt-1 text-sm text-gray-500">{query.region ? query.region : "All Tunisia"}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
