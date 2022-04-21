import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon} from '@heroicons/react/solid'
import {useStore} from "../store";
import {classNames} from "../utils";

export default function Pagination({onPageChange, currentPage}) {
    const pages = useStore(state => state.pages);
    console.log(currentPage);
    return <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-8">
        <div className="-mt-px w-0 flex-1 flex">
            <button
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 2)
                    }
                }}
            >
                <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                Previous
            </button>
        </div>
        <div className="hidden md:-mt-px md:flex">

            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            {
                [...Array(pages).keys()].map((i) => (
                    <div key={i}>
                        <button
                            id={"button_" + i}
                            key={i}
                            className={classNames(i + 1 === currentPage
                                    ? "border-indigo-500 text-indigo-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium")}
                            onClick={() => onPageChange(i)}>{i + 1}</button>
                    </div>
                ))
            }
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
            <button
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                onClick={() => {
                    if (currentPage < pages) {
                        onPageChange(currentPage)
                    }
                }}>
                Next
                <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
            </button>
        </div>
    </nav>
}
