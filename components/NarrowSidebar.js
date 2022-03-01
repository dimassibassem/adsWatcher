import React from 'react';

const NarrowSidebar = () => {
    return (
        <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block  sidebar">
            <div className="w-full py-6 flex flex-col items-center">
                <div className="flex-shrink-0 fixed flex items-center">
                    <img
                        className="h-8 w-auto "
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt="Workflow"
                    />
                </div>
                <div className="flex-1 mt-6 w-full px-2 space-y-1">
                </div>
            </div>
        </div>
    );
};

export default NarrowSidebar;
