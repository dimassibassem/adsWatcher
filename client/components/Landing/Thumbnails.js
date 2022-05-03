import {SearchIcon} from "@heroicons/react/solid";

export default function Thumbnails({popularSearchs}) {
    const images = popularSearchs.thumbnails
    return (
        <ul role="list" className=" relative grid grid-cols-4 gap-x-1 gap-y-1 sm:grid-cols-4 lg:grid-cols-4 ">
            <div className="absolute bg-white overflow-hidden shadow rounded-lg text-indigo-600 z-30 font-bold text-2xl place-self-center w-full text-center">
                <SearchIcon className=" ml-20 absolute mt-1 h-6 w-6 text-indigo place-self-center text-center"/>
                {popularSearchs.query}
            </div>
            {images.map((image) => (
                <li key={image.source} className="relative">
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={image} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
