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
    const queries = useStore(store => store.queries)

    const setSource = useStore(store => store.setSource)
    const setUserData = useStore(store => store.setUserData)
    const setCurrentFile = useStore(store => store.setCurrentFile)

    useEffect(async () => {
        if (tokenValid(token)) {
        const response = await axios({
            url: "http://localhost:3001/api/data",
            method: "get",
            headers: {Authorization: "Bearer " + token}
        })
        setQueries(await response.data)}
        else{
            await router.push("/login")
        }
    }, [router, setQueries, token]);



    useEffect(async () => {
        if (tokenValid(token)) {
            await setUserData(token)
        } else {
            await router.push("/Login")
        }
    }, [router, setUserData, token])

    useEffect(async () => {
        if (tokenValid(token)) {
            await setSource(token)
        } else {
            await router.push("/Login")
        }
    }, [router, setSource, token]);


    useEffect(async () => {
        if (tokenValid(token)) {
            setCurrentFile(null)
            await setCategoryDisplayNames(token)
        } else {
            await router.push("/Login")
        }
    }, [router, setCategoryDisplayNames, setCurrentFile, token]);
    return (
        <>
            <div className="h-full flex">

                {/* Content area */}
                <ContentArea/>
            </div>

        </>
    )
}
