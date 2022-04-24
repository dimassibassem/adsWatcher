import {HeartIcon as HeartIconSolid} from "@heroicons/react/solid";
import {useLocalStorage, useStore} from "../../store";
import axios from "axios";
import {since} from "../../utils/since";
import React from 'react';
import dynamic from "next/dynamic";

const CarouselJsx = dynamic(
    () => {
        return import("../Carousel");
    },
    {ssr: false}
);


const ImageAndName = ({currentFile}) => {
    const moreImages = useStore(state => state.moreImages);
    const token = useLocalStorage(state => state.token);
    const setOneUnFavArticle = useStore(state => state.setOneUnFavArticle);
    const setOneFavArticle = useStore(state => state.setOneFavArticle);
    const setCurrentFileToFav = useStore(state => state.setCurrentFileToFav);
    const updateArticleToDisplayWithFav = useStore(state => state.updateArticleToDisplayWithFav);
    const setCurrentFileToUnFav = useStore(state => state.setCurrentFileToUnFav);

    const addToFavorite = async () => {
        await axios.get(`http://localhost:3001/api/favorite/${currentFile.id}`, {
            headers: {
                'Authorization': `Bearer ` + token
            }
        })

        if (currentFile.favorite) {
            setOneUnFavArticle(currentFile)
            setCurrentFileToUnFav()
        } else {
            setOneFavArticle(currentFile)
            setCurrentFileToFav()
            updateArticleToDisplayWithFav(currentFile.id)
        }
    }


    return (
        <div>
            {moreImages.length === 0 ? <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img src={currentFile.thumbnail} alt="" className="object-cover"/>
            </div> : <CarouselJsx images={moreImages}/>}
            <div className="mt-4 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        <span className="sr-only">Details for </span>
                        {currentFile.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">{currentFile.price === 0 ? "price not specified" : currentFile.price + " TND"}</p>
                </div>
                <button
                    type="button"
                    className="ml-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-gray-400 hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={async () => {
                        await addToFavorite()
                    }}
                >
                    {!currentFile.favorite && <HeartIconSolid className="h-8 w-8 text-red-300" aria-hidden="true"/>}
                    {currentFile.favorite && <HeartIconSolid className="h-8 w-8 text-red-600 " aria-hidden="true"/>}
                    <span className="sr-only">Favorite</span>
                </button>
            </div>
            <p className="text-sm font-medium text-gray-500 pt-3 text-right">{since(currentFile)}</p>
        </div>
    );
};

export default ImageAndName;
