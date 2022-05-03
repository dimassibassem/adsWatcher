import React from 'react';
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="relative bg-gray-100 pb-14 pt-4">
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-white"/>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-2xl sm:rounded-2xl sm:overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                            alt="People working on laptops"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"/>
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">We watch ads for you 👀</span>
                            <span className="block text-indigo-200">adsWatcher</span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                            We simplify research and display results from hundreds of thousands of ads indexed on Tunisia classifieds websites as well as social networks in a single,
                            unique experience search
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div
                                className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <Link href="/Register" passHref>
                                    <div
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                                >
                                    Get started
                                </div>
                                </Link>
                                <a
                                    href="#contact"
                                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                >
                                    Contact us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
