import React from 'react';
import {classNames} from "../../utils";
import {useStore} from "../../store";
import Link from 'next/link'
import {useRouter} from "next/router";

const Tabs = ({all}) => {
    const tabs = useStore(store => store.tabs)
    const router = useRouter();
    const {id} = router.query
    return (
        <div className="mt-3 sm:mt-2">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue="Recently Viewed"
                >
                    <option>Recently Viewed</option>
                    <option>Favorited</option>
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="flex items-center border-b border-gray-200">
                    <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                         aria-label="Tabs">
                        <Link key={tabs[0].name}
                              href={tabs[0].href+'/'+id}
                              aria-current={all ? 'page' : undefined}
                        ><a

                            className={classNames(
                                all
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                        >
                            {tabs[0].name}
                        </a>
                        </Link>
                        <Link key={tabs[1].name}
                              href={tabs[1].href+'/'+id}
                              aria-current={!all ? 'page' : undefined}>
                            <a

                                className={classNames(
                                    !all
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                            >
                                {tabs[1].name}
                            </a>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
