import Thumbnails from "./Thumbnails";
export default function Grid({popularSearchs}) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularSearchs?.map((search) => (
                <li
                    key={search.query}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col p-0.5">
             <Thumbnails  key={search.query} popularSearchs={search} />
                    </div>
                </li>
            ))}
        </ul>
    )
}
