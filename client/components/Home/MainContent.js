import React from 'react';
import {ViewGridIcon as ViewGridIconSolid, ViewListIcon} from "@heroicons/react/solid";
import Tabs from "./Tabs";
import DetailsSidebar from "./DetailsSidebar";
import GalleryList from "./GalleryList";
import PrevButton from "../PrevButton";

const MainContent = () => {
    return (
        <div className="flex-1 flex items-stretch overflow-hidden">
            <main
                className="flex-1 overflow-y-auto scroll-auto h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent">
                <PrevButton path={"Search"}/>
                <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
                    </div>
                    {/* Tabs */}
                    <Tabs/>
                    <GalleryList/>
                </div>
            </main>

            {/* Details sidebar */}
            <DetailsSidebar/>
        </div>
    );
};

export default MainContent;
