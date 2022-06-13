import React, {useEffect} from 'react';
import {ClipboardListIcon, DotsVerticalIcon, FolderIcon, TrashIcon, XCircleIcon, XIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'
import {tokenValid} from "../../utils/token";
import axios from "axios";
import {useLocalStorage, useStore} from "../../store";
import SearchesThumbnails from "../SearchesThumbnails";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";


export default function ExpandingCards() {
    const queries = useStore(state => state.queries);
    const setQueries = useStore(state => state.setQueries);
    const token = useLocalStorage(state => state.token);
    const router = useRouter()

    async function setQueriesFun() {
        if (tokenValid(token)) {
            const response = await axios({
                url: "http://localhost:3001/api/data",
                method: "get",
                headers: {Authorization: "Bearer " + token}
            })
            setQueries(await response.data)
        } else {
            await router.push("/LandingPage")
        }
    }
    const deleteQuery = async (id) => {
        await axios.delete(`http://localhost:3001/search/${id}`)
    }
    const deleteQueryHandler = async (id) => {
        await deleteQuery(id);
        setQueries(queries.filter(query => query.id !== id));
    }

    useEffect(() => {
        setQueriesFun().catch(err => console.log(err))
    }, [router, setQueries, token]);
    return (
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={false}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                        {queries.map((query,i) => (
                    <SwiperSlide key={i}>
                        <div key={query.id} className=" shadow-sm rounded-md">
                            <div className="grid grid-cols-2 gap-4">
                                <div className=" h-max text-sm ">
                                    <SearchesThumbnails query={query}/>
                                </div>

                                <div className="">
                                    <p className="text-gray-500 text-sm">query: {query.query}</p>
                                    <p className="text-gray-500 text-sm">maxPrice: {query.maxPrice}</p>
                                    <p className="text-gray-500 text-sm">minPrice: {query.minPrice}</p>
                                    <p className="text-gray-500 text-sm">Region: {query.region}</p>
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await deleteQueryHandler(query.id)
                                        }}
                                        className="inline-flex items-center justify-center rounded-xl py-1 pr-1 text-sm text-black hover:text-red-800 hover:bg-red-300 font-medium border border-transparent "
                                    >
                                        <TrashIcon className="w-5 h-5 text-red-900 " aria-hidden="true"/>
                                        <span className="ml-3 font-medium text-red-900">Delete Query</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>

    )
}


// export default ExpandingCards;
