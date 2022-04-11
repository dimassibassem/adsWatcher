import {HeartIcon} from "@heroicons/react/outline";
import {useStore} from "../../store";
import axios from "axios";


const ImageAndName = ({currentFile}) => {
    const moreImages = useStore(state => state.moreImages);
    const userData = useStore(state => state.userData);
    let imagesView = <div/>
    if (moreImages.length > 0) {
        imagesView = moreImages.map((image, index) => {
            return (
                <div key={index}>
                    <img className="object-cover" src={image} alt=""/>
                </div>
            )
        })
    }

const addToFavorite = async (id) => {
    const res = await axios.post(`http://localhost:3001/favorite/${currentFile.id}`, {
        userId: id
    })
    console.log(res.data.message);
}
    return (
        <div>
            {imagesView}
            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img src={currentFile.thumbnail} alt="" className="object-cover"/>
            </div>
            <div className="mt-4 flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        <span className="sr-only">Details for </span>
                        {currentFile.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">{currentFile.price} TND</p>
                </div>
                <button
                    type="button"
                    className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={async () => {
                        console.log(currentFile.articleId, userData.id);
                        await addToFavorite(userData.id)
                    }}
                >
                    <HeartIcon className="h-6 w-6" aria-hidden="true"/>
                    <span className="sr-only">Favorite</span>
                </button>
            </div>
        </div>
    );
};

export default ImageAndName;
