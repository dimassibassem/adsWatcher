import React from 'react';

import MainContent from "./MainContent";
import ProfileDropdown from "./ProfileDropdown";

import SearchBar from "./SearchBar";

const ContentArea = ({ userNavigation, files, tabs,source}) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">


                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        {/* search bar*/}
                        <SearchBar/>

                        {/* Profile dropdown */}
                        <ProfileDropdown userNavigation={userNavigation}/>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <MainContent  tabs={tabs} source={source} />
        </div>
    );
};

export default ContentArea;
