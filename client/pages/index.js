import ContentArea from "../components/Home/ContentArea";
import {useEffect} from "react";
import {useLocalStorage, useStore} from "../store";
import axios from "axios";


const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]


// const timestamp = new Date(1645804485 * 1000);
// let month = timestamp.getMonth() + 1;
// let year = timestamp.getFullYear();
// let date = timestamp.getDate();

export default function Home() {
    const loadFiles = useStore(store => store.loadFiles)
    const token = useLocalStorage(store => store.token)
    const files = useStore(store => store.files)
    const source = useStore(store=>store.source)
    const tabs = useStore(store=>store.tabs)
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
