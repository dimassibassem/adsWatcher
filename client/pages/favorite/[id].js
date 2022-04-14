import React, {useEffect} from 'react';
import ProfileDropdown from "../../components/Home/ProfileDropdown";
import {useLocalStorage, useStore} from "../../store";
import Tabs from "../../components/Home/Tabs";
import DetailsSidebar from "../../components/Home/DetailsSidebar";
import {tokenValid} from "../../utils/token";
import {useRouter} from "next/router";
import PrevButton from "../../components/PrevButton";
import Articles from "../../components/Articles/Articles";


const Id = () => {
    const token = useLocalStorage(state => state.token);
    const setUserData = useStore(state => state.setUserData);
    const setSource = useStore(state => state.setSource);
    const setCategoryDisplayNames = useStore(state => state.setCategoryDisplayNames);
    const router = useRouter();
    const userData = useStore(state => state.userData);
    const articleToDisplay = useStore(state => state.articleToDisplay);
    let favArticles = articleToDisplay.filter(article => article.favorite);
    const {id} = router.query
    useEffect(async () => {
        if (tokenValid(token)) {
            await setUserData(token)
            await setSource(token)
            await setCategoryDisplayNames(token)
        } else {
            await router.push('/Login')
        }
    }, [token])
    return (
        <div className="h-full flex">
            <div className="flex-1 flex flex-col overflow-hidden ">
                <header className="w-full">
                    <div
                        className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">


                        <div className="flex-1 flex justify-between px-4 sm:px-6">
                            {/* search bar*/}
                            <div>
                                <div>
                                    <img
                                        className="mx-auto mt-2"
                                        src="/adsWatcher.jpeg"
                                        alt="Workflow"
                                        width="180"
                                        height="120"
                                    />
                                </div>
                            </div>
                            {/* Profile dropdown */}
                            <ProfileDropdown/>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex items-stretch overflow-hidden">
                    <main
                        className="flex-1 overflow-y-auto scroll-auto h-[90vh] scrollbar scrollbar-transparent scrollbar-track-transparent">
                        <PrevButton path={""}/>
                        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex">
                                <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
                            </div>

                            {/* Tabs */}
                            <Tabs all={false}/>

                            <Articles articleToDisplay={favArticles}/>

                        </div>
                    </main>

                    {/* Details sidebar */}
                    <DetailsSidebar/>
                </div>
            </div>
        </div>
    )
};

export default Id;
