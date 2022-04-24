import {XIcon} from '@heroicons/react/outline'
import {XCircleIcon} from "@heroicons/react/solid";

export default function ErrorNotification({message, setErrorMessage}) {
    return (
        <div className="fixed top-10 inset-x-0 pb-2 sm:pb-5 z-10">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-2 rounded-lg bg-red-200 shadow-lg sm:p-3">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-red-800">
                <XCircleIcon className="h-7 w-7 text-red-400" aria-hidden="true"/>
              </span>
                            <div className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">Error!</span>
                                <span className="hidden md:inline"><h2 className="text-sm font-medium text-red-800">There is an Error with your submission:</h2> <div
                                    className="text-red-700">{message}</div></span>
                            </div>
                        </div>

                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                            <button
                                type="button"
                                className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red"
                                onClick={() => setErrorMessage("")}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="h-6 w-6 text-red-700" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
