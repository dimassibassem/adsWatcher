import React from 'react';
import MainContent from "./MainContent";
import ProfileDropdown from "../ProfileDropdown";

const ContentArea = () => {

    return (
        <div className="flex-1 flex flex-col overflow-hidden ">
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        <div>
                            <img
                                className="mx-auto mt-2"
                                src="/adswatcher.jpeg"
                                alt="Workflow"
                                width="180"
                                height="120"
                            />
                        </div>

                        {/* Profile dropdown */}
                        <ProfileDropdown/>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <MainContent/>
        </div>
    );
};

export default ContentArea;
