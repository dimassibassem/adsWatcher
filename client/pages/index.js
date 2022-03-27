import ContentArea from "../components/Home/ContentArea";
import {useEffect} from "react";
import {useLocalStorage, useStore} from "../store";
import axios from "axios";
import {useRouter} from "next/router";
import {tokenValid} from "../utils/token";

export default function Home() {

    const token = useLocalStorage(store => store.token)
    const setQueries = useStore(store => store.setQueries)
    const setCategoryDisplayNames = useStore(store => store.setCategoryDisplayNames)
    const router = useRouter()


    const loadFiles = async () => {
        const response = await axios({
            url: "http://localhost:3001/api/data",
            method: "get",
            headers: {Authorization: "Bearer " + token}
        })
        setQueries(await response.data)
    }
    const setSource = useStore(store => store.setSource)
    const setUserData = useStore(store => store.setUserData)
    const setCurrentFile = useStore(store => store.setCurrentFile)

    useEffect(async () => {
        if (tokenValid(token)) {
            await setUserData(token)
            // await setLocations()
            setCurrentFile(null)
            await setSource(token)
            await setCategoryDisplayNames(token)
            await loadFiles()
        } else {
            await router.push("/Login")
        }
    }, [token]);
    return (
        <>
            <div className="h-full flex">

                {/* Content area */}
                <ContentArea/>
            </div>

        </>
    )
}
