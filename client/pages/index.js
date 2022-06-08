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
    const setSource = useStore(store => store.setSource)
    const setUserData = useStore(store => store.setUserData)
    const setCurrentFile = useStore(store => store.setCurrentFile)
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
    useEffect(() => {
        setQueriesFun().catch(err => console.log(err))
    }, [router, setQueries, token]);


    useEffect(() => {
        async function setUserDataFun() {
            if (tokenValid(token)) {
                await setUserData(token)
            } else {
                await router.push("/LandingPage")
            }
        }
        setUserDataFun().catch(err => console.log(err))
    }, [router, setUserData, token])

    useEffect(() => {
        async function setSourceFun() {
            if (tokenValid(token)) {
                await setSource(token)
            } else {
                await router.push("/LandingPage")
            }
        }

        setSourceFun().catch(err => console.log(err))
    }, [router, setSource, token]);


    useEffect(() => {
        async function setCategoryDisplayNamesFun() {
            if (tokenValid(token)) {
                setCurrentFile(null)
                await setCategoryDisplayNames(token)
            } else {
                await router.push("/LandingPage")
            }
        }

        setCategoryDisplayNamesFun().catch(err => console.log(err))
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
