import {SearchIcon} from "@heroicons/react/solid";
import Link from "next/link";

export default function SearchesThumbnails({query}) {
    return (
        <ul role="list" className=" relative grid grid-cols-4 gap-x-1 gap-y-1 sm:grid-cols-4 lg:grid-cols-4 ">
                <Link href={'/Article/'+query.id} passHref >
            <div
                className="absolute  cursor-pointer  overflow-hidden shadow rounded-lg text-indigo-600 z-30 font-bold text-sm place-self-center w-full text-center">
                    <a>
                        <div className="h-5 bg-white">
                            {query.query}
                        </div>
                    </a>
            </div>
                </Link>
            {query.thumbnails.map((image,i) => (
                <li key={i} className="relative">
                    <div
                        className="group block w-full h-full aspect-w-10 aspect-h-16 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={image} alt="" className="object-cover pointer-events-none group-hover:opacity-75"/>
                    </div>
                </li>
            ))}
        </ul>
    )
}

