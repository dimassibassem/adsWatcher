import React, {useEffect, useState} from 'react';
import SearchInput from "../components/Search/SearchInput";
import ProfileDropdown from "../components/ProfileDropdown";
import {tokenValid} from "../utils/token";
import {useLocalStorage, useStore} from "../store";
import {useRouter} from "next/router";
import axios from "axios";




const Search = () => {
    const router = useRouter()
    const setUserData = useStore(store => store.setUserData)
    const token = useLocalStorage(store => store.token)
    const setArticleToDisplay = useStore(store => store.setArticleToDisplay)
    const setCurrentFile = useStore(store => store.setCurrentFile)
    async function setUserDataFunc() {
        if (tokenValid(token)) {
            setCurrentFile(null)
            setArticleToDisplay([])
            await setUserData(token)
        } else {
            await router.push("/Login")
        }
    }
    useEffect(() => {
        setUserDataFunc().catch(err => console.log(err))
    }, [router, setUserData, token]);


    return (<div>
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        <div>
                            <img
                                className="mx-auto mt-2"
                                src="/adswatcher.jpeg"
                                alt="Workflow"
                                width="180"
                                height="120"
                            />
                        </div>

                        {/* Profile dropdown */}
                        <ProfileDropdown/>
                    </div>
                </div>
            </header>

            <SearchInput/>
        </div>
    )


};

export default Search;



