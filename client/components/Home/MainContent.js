import React from 'react';
import DetailsSidebar from "./DetailsSidebar";

import PrevButton from "../PrevButton";
import ExpandingCards from "./ExpandingCards";

const MainContent = () => {
    return (
        <div className="flex-1 flex items-stretch overflow-hidden">
            <main
                className="flex-1 overflow-y-auto scroll-auto h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent">
                <PrevButton path={"Search"}/>
                <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <h1 className="flex-1 text-2xl font-bold text-gray-900">Searches</h1>
                    </div>
                    <ExpandingCards/>
                </div>
            </main>

            {/* Details sidebar */}
            <DetailsSidebar/>
        </div>
    );
};

export default MainContent;
