import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full">
            <div
                className=" mb-4 mt-2 relative z-10 flex-shrink-0 h-16 flex">
                <div className="flex-1 flex justify-between px-4 sm:px-6 mb-4">
                    <div>
                        <img
                            className="mx-auto mt-2"
                            src="/adswatcher.jpeg"
                            alt="Workflow"
                            width="180"
                            height="120"
                        />
                    </div>


                    <div className=" md:flex items-center justify-end md:flex-1 mt-3 mb-2">
                        <Link href="/Login" passHref>
                            <a
                                className=" inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                Sign in
                            </a>
                        </Link>
                        <Link href="/Register" passHref>
                            <a
                                className="ml-4 inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700">
                                Sign up
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
