import React, {Fragment} from 'react';
import {HeartIcon, MenuAlt2Icon, PlusSmIcon as PlusSmIconOutline} from "@heroicons/react/outline";
import {
    PencilIcon,
    PlusSmIcon as PlusSmIconSolid,
    SearchIcon,
    ViewGridIcon as ViewGridIconSolid,
    ViewListIcon
} from "@heroicons/react/solid";
import {Menu, Transition} from "@headlessui/react";
import {classNames} from "../utils";
import MainContent from "./MainContent";
import ProfileDropdown from "./ProfileDropdown";

const ContentArea = ({setMobileMenuOpen, userNavigation, currentFile, files, tabs}) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        <div className="flex-1 flex">
                            <form className="w-full flex md:ml-0" action="#" method="GET">
                                <label htmlFor="desktop-search-field" className="sr-only">
                                    Search all files
                                </label>
                                <label htmlFor="mobile-search-field" className="sr-only">
                                    Search all files
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                        <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true"/>
                                    </div>
                                    <input
                                        name="mobile-search-field"
                                        id="mobile-search-field"
                                        className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
                                        placeholder="Search"
                                        type="search"
                                    />
                                    <input
                                        name="desktop-search-field"
                                        id="desktop-search-field"
                                        className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                                        placeholder="Search all files"
                                        type="search"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">

                            {/* Profile dropdown */}
                            <ProfileDropdown userNavigation={userNavigation}/>

                            <button
                                type="button"
                                className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusSmIconOutline className="h-6 w-6" aria-hidden="true"/>
                                <span className="sr-only">Add file</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <MainContent currentFile={currentFile} tabs={tabs} files={files}/>
        </div>
    );
};

export default ContentArea;
