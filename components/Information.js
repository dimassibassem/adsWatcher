import React from 'react';

const Information = ({currentFile}) => {
    return (
        <div>
            <div>
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                    {Object.keys(currentFile.information).map((key) => (
                        <div key={key} className="py-3 flex justify-between text-sm font-medium">
                            <dt className="text-gray-500">{key}</dt>
                            <dd className="text-gray-900">{currentFile.information[key]}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                    <div className="py-3 flex justify-between text-sm font-medium">

                        <dd className="text-gray-500">Write description here</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Information;
