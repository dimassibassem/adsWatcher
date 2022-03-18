import ContentArea from "../components/Home/ContentArea";
import {useEffect} from "react";
import {useLocalStorage, useStore} from "../store";
import axios from "axios";

export default function Home() {

    const token = useLocalStorage(store => store.token)
    const setFiles = useStore(store => store.setFiles)
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
    console.log(token);
    useEffect(async () => {
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
