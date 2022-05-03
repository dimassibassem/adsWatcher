import React, {useEffect, useState} from 'react'
import axios from "axios";
import Stats from "./Stats";
import Grid from "./Grid";
import Logos from "./Logos";
import ContactUs from "./ContactUs";
import HeroSection from "./HeroSection";
import CtaSection from "./Contact/CTASection";
import Header from "./Contact/Header";

export default function Landing() {
    const [count, setCount] = useState(0);
    const [popularSearchs, setPopularSearchs] = useState([]);

    async function adsCount() {
        const res = await axios.get("http://localhost:3001/api/stats");
        setCount(res.data)
    }

    async function getPopularSearchs() {
        const res = await axios.get("http://localhost:3001/api/popularSearches");
        const queries = res.data.map(item => item["query"])
        let popularSearchObj = [];
        for (let i = 0; i < queries.length; i++) {
            let thumbnails = await axios.get(`http://localhost:3001/api/getEightArticleThmbnails/${queries[i]}`)
            popularSearchObj.push({
                query: queries[i],
                thumbnails: thumbnails.data
            })
        }
        setPopularSearchs(popularSearchObj)
    }

    useEffect(() => {
        adsCount().catch(err => console.log(err))
        getPopularSearchs().catch(err => console.log(err))
    }, []);

    return <div className=" bg-gray-100">
        <Header/>
        <main>

            <HeroSection/>

            <Grid/>
            <div className="px-10 pt-5 pb-8 bg-gray-100">
                <Stats count={count}/>
            </div>
            <div className="px-10 pt-8 bg-white pb-8">
                <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide pb-10 ">
                    popular researches of our subscribers
                </p>
                <Grid popularSearchs={popularSearchs}/>
            </div>

            <Logos/>

            <CtaSection/>

        </main>

        <footer className="bg-gray-100" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div id="contact"></div>
            <ContactUs/>

        </footer>
    </div>
}
