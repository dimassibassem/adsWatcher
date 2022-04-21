/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon} from '@heroicons/react/solid'
import {useStore, useLocalStorage} from "../store";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {classNames} from "../utils";

export default function Pagination() {
    const pages = useStore(state => state.pages);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const {id} = router.query
    const token = useLocalStorage(state => state.token);
    const setArticleToDisplay = useStore(state => state.setArticleToDisplay);
    return <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-8">
        <div className="-mt-px w-0 flex-1 flex">
            <a
                href="#"
                className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
                <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                Previous
            </a>
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
                            onClick={async () => {
                                setArticleToDisplay((await axios.get(`http://localhost:3001/api/Article/${id}?page=${i + 1}`, {
                                    headers: {
                                        'authorization': 'Bearer ' + token
                                    }
                                })).data.articles);
                                setCurrentPage(i + 1);
                            }}>{i + 1}</button>
                    </div>
                ))
            }
        </div>
        <div className="-mt-px w-0 flex-1 flex justify-end">
            <a
                href="#"
                className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
                Next
                <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
            </a>
        </div>
    </nav>
}
