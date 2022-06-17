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
import History from "../History";


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
                    className="mySwiper mb-8"
                >
                        {queries.map((query,i) => (
                    <SwiperSlide key={i}>
                        <History key={i} query={query} deleteQueryHandler={deleteQueryHandler}/>
                    </SwiperSlide>
                    ))}
                </Swiper>

    )
}


// export default ExpandingCards;
