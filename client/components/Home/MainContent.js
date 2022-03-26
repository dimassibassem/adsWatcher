import React from 'react';
import {ViewGridIcon as ViewGridIconSolid, ViewListIcon} from "@heroicons/react/solid";
import Tabs from "./Tabs";
import Gallery from "./Gallery";
import DetailsSidebar from "./DetailsSidebar";
import GalleryList from "./GalleryList";
import {useStore} from "../../store";
import Loading from "./Loading";

const MainContent = () => {
    const list = useStore(store => store.list)
    const queries = useStore(state => state.queries);
    let view = <GalleryList />
    return (
        <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto scroll-auto h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent">
                <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
                        <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                            <button
                                type="button"
                                className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <ViewListIcon className="h-5 w-5" aria-hidden="true"/>
                                <span className="sr-only">Use list view</span>
                            </button>
                            <button
                                type="button"
                                className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <ViewGridIconSolid className="h-5 w-5" aria-hidden="true"/>
                                <span className="sr-only">Use grid view</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs />


                    {view}

                </div>
            </main>

            {/* Details sidebar */}
            <DetailsSidebar />
        </div>
    );
};

export default MainContent;
