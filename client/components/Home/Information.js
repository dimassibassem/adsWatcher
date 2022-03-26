import React from 'react';
import {useStore} from "../../store";

const Information = ({currentFile}) => {
    const categoryDisplayNames = useStore(store => store.categoryDisplayNames);

    const formatedDate = (timestamp) => {
        let ts = new Date(timestamp * 1000);
        let month = ts.getMonth() + 1;
        let year = ts.getFullYear();
        let date = ts.getDate();
        return `${date}/${month}/${year}`
    }

    let distance = currentFile.distance !== 0 ? <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Distance</dt>
        <dd className="text-gray-900">{currentFile.distance} KM</dd>
    </div> : <div/>;

    return (
        <div>
            <div>
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">

                    <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Category</dt>
                        <dd className="text-gray-900">{categoryDisplayNames[currentFile.categoryId - 1].name}</dd>
                    </div>

                    <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Location</dt>
                        <dd className="text-gray-900">{currentFile?.location}</dd>
                    </div>
                    <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Posted at</dt>
                        <dd className="text-gray-900">{formatedDate(currentFile.timestamp)}</dd>
                    </div>

                    {distance}

                </dl>
            </div>
            <div className="pt-3">
                <h3 className="font-medium text-gray-900">Description</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                    <div className="py-3 flex justify-between text-sm font-medium">

                        <dd className="text-gray-500">{currentFile.description}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Information;
