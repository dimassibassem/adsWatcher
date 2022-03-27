import React from 'react';
import {useLocalStorage, useStore} from '../../store';
import axios from "axios";
import {useRouter} from "next/router";
import ExpandingCards from "../ExpandingCards";


const GalleryList = () => {
    const router = useRouter();
    const queries = useStore(state => state.queries);

    const setArticleToDisplay = useLocalStorage(store => store.setArticleToDisplay)
    const deleteQuery = async (id) => {
        await axios.delete(`http://localhost:3001/api/search/${id}`)
    }
    const displayArticle = async (id) => {
        const result = await axios.get(`http://localhost:3001/api/article/${id}`)
        return result.data
    }
    return (
        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="sr-only">
                Recently viewed
            </h2>
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-3 gap-y-8  sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
            >
                {queries.map((query) => (
                    <ExpandingCards key={query.id} query={query} displayArticle={displayArticle}
                                    setArticleToDisplay={setArticleToDisplay} deleteQuery={deleteQuery}/>
                ))}
            </ul>
        </section>
    );
};

export default GalleryList;
