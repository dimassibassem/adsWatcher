import React from 'react';

const LinkButton = ({source, currentFile}) => {
    return (
        <div className="flex">
                <button

                    type="button"
                    className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
            <a href={currentFile.sourceUrl} target="_blank" rel="noreferrer" >
                    See on {source[currentFile.sourceId].name}
            </a>
                </button>


        </div>
    );
};

export default LinkButton;
