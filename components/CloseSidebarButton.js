import React from 'react';
import {MenuAlt2Icon} from "@heroicons/react/outline";

const CloseSidebarButton = ({setMobileMenuOpen}) => {
    return (
        <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
        >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>
        </button>
    );
};

export default CloseSidebarButton;
