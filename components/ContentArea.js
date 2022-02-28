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
import CloseSidebarButton from "./CloseSidebarButton";
import SearchBar from "./SearchBar";

const ContentArea = ({setMobileMenuOpen, userNavigation, currentFile, files, tabs}) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">

                    {/* close Sidebar Button */}
                    <CloseSidebarButton setMobileMenuOpen={setMobileMenuOpen}/>

                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        {/* search bar*/}
                        <SearchBar />

                            {/* Profile dropdown */}
                            <ProfileDropdown userNavigation={userNavigation}/>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <MainContent currentFile={currentFile} tabs={tabs} files={files}/>
        </div>
    );
};

export default ContentArea;
