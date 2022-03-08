import React from 'react';
import ImageAndName from "./ImageAndNameOfSelected";
import Information from "./Information";
import LinkButton from "./LinkButton";
import {useStore} from "../pages";

const DetailsSidebar = ({source}) => {
    const currentFile = useStore(state => state.currentFile);
    return (
        <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
            <div className="pb-16 space-y-6 ">
                {/* image and name details*/}
                <ImageAndName currentFile={currentFile}/>
                {/*Information */}
                <Information currentFile={currentFile}/>
                {/* Link Button */}
                <LinkButton source={source}/>
            </div>
        </aside>

    );
};

export default DetailsSidebar;
