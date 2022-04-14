import React, {useEffect} from 'react';
import {useLocalStorage, useStore} from '../../store';
import axios from "axios";
import ExpandingCards from "../ExpandingCards";


const GalleryList = () => {
    const token = useLocalStorage(store => store.token);
    const queries = useStore(state => state.queries);

    const setArticleToDisplay = useStore(store => store.setArticleToDisplay)
    const deleteQuery = async (id) => {
        await axios.delete(`http://localhost:3001/search/${id}`)
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
                    <ExpandingCards key={query.id} query={query}
                                    deleteQuery={deleteQuery}/>
                ))}
            </ul>
        </section>
    );
};

export default GalleryList;
