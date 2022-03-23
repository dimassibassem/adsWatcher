import ContentArea from "../components/Home/ContentArea";
import {useEffect} from "react";
import {useLocalStorage, useStore} from "../store";
import axios from "axios";
import {useRouter} from "next/router";

export default  function Home() {

    const token = useLocalStorage(store => store.token)
    const setFiles = useStore(store => store.setFiles)
    const setCategoryDisplayNames = useStore(store => store.setCategoryDisplayNames)
    const router = useRouter()



    const loadFiles = async () => {
        const response = await axios({
            url: "http://localhost:3001/api/data",
            method: "get",
            headers: {Authorization: "Bearer " + token}
        })
        setFiles(await response.data)
    }


    const files = useStore(store => store.files)
    const source = useStore(store => store.source)
    const tabs = useStore(store => store.tabs)
    const userNavigation = useStore(store => store.userNavigation)
    const setSource = useStore(store => store.setSource)
    console.log(token);
    useEffect(async () => {
        await setSource(token)
        await setCategoryDisplayNames(token)
        await loadFiles()
    }, []);
    return (
        <>
            <div className="h-full flex">

                {/* Content area */}
                <ContentArea userNavigation={userNavigation}
                             files={files} tabs={tabs} source={source}/>

            </div>

        </>
    )
}
