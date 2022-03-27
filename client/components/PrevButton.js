import React from 'react';
import {useRouter} from "next/router";

const PrevButton = ({path}) => {
    const router = useRouter();
    return (
            <div className="flex flex-row mx-auto">
                <button type="button"
                        onClick={async () => {
                            await router.push(`/${path}`);
                        }}
                        className="text-indigo-500 rounded-l-3xl rounded-r-md border-indigo-100 py-2 hover:bg-indigo-400 hover:text-white px-3">
                    <div className="flex flex-row align-middle">
                        <svg className="w-7 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                        <p className="ml-2 font-semibold">Prev</p>
                    </div>
                </button>
            </div>
    );
};

export default PrevButton;
