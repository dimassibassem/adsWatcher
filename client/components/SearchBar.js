import React from 'react';
import {SearchIcon} from "@heroicons/react/solid";

const SearchBar = () => {
    return (
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
    );
};

export default SearchBar;
