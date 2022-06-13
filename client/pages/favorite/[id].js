import React, {useEffect, useState} from 'react';
import ProfileDropdown from "../../components/ProfileDropdown";
import {useLocalStorage, useStore} from "../../store";
import Tabs from "../../components/Articles/Tabs";
import DetailsSidebar from "../../components/Home/DetailsSidebar";
import {tokenValid} from "../../utils/token";
import {useRouter} from "next/router";
import PrevButton from "../../components/PrevButton";
import Articles from "../../components/Articles/Articles";
import axios from "axios";

const Id = () => {
    const token = useLocalStorage(state => state.token);
    const setUserData = useStore(state => state.setUserData);
    const setSource = useStore(state => state.setSource);
    const setCategoryDisplayNames = useStore(state => state.setCategoryDisplayNames);

    const router = useRouter();

    // todo get favArticles from the store
    const favoriteArticles = useStore(state => state.favoriteArticles);
    const setFavArticles = useStore(state => state.setFavArticles);
    let {id} = router.query
    const setPages = useStore(state => state.setPages);
    const [currentPage, setCurrentPage] = useState(1);
    const setFav = async (i) => {
        const response = (await axios.get(`http://localhost:3001/api/fav_articles/${id}/?page=${i + 1}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })).data;
        setFavArticles(response.articles);
        setPages(response.pages);
        setCurrentPage(i + 1);
    }

    useEffect(() => {
        setFav(0).catch(err => console.log(err))
    }, [id]);

    useEffect(() => {
        async function setupFun() {
            if (tokenValid(token)) {
                await setUserData(token)
                await setSource(token)
                await setCategoryDisplayNames(token)
            } else {
                await router.push('/Login')
            }
        }

        setupFun().catch(err => console.log(err))
    }, [router, setCategoryDisplayNames, setSource, setUserData, token])
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
                        <PrevButton path={"Search"}/>
                        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex">
                                <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
                            </div>

                            {/* Tabs */}
                            <Tabs all={false}/>
                            <Articles articleToDisplay={favoriteArticles} onPageChange={setFav}
                                      currentPage={currentPage}/>

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
