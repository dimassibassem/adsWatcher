import React from 'react';
import ImageAndName from "./ImageAndName";
import Information from "../Articles/Information";
import LinkButton from "./LinkButton";
import {useStore} from "../../store";

const DetailsSidebar = () => {
    const source = useStore(store => store.source)
    const currentFile = useStore(state => state.currentFile);

    if (currentFile) {
        return (
            <aside
                className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block overscroll-auto hover:overscroll-contain h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent sticky">
                <div className="pb-16 space-y-6 ">
                    {/* image and name details*/}
                    <ImageAndName currentFile={currentFile}
                    />
                    {/*Information */}
                    <Information currentFile={currentFile}/>
                    {/* Link Button */}
                    <LinkButton currentFile={currentFile} source={source}/>
                </div>
            </aside>

        );
    }

    if (!currentFile) {
        return null

    }
};

export default DetailsSidebar;
