import React, {useEffect, useState} from 'react';
import 'tw-elements';

const Carousel = ({images}) => {
    const [imagesArray, setImagesArray] = useState([]);
    useEffect(() => {
        setImagesArray(images);
}, [images])
    return (
        <div id="carouselExampleControls" className="carousel slide relative" data-bs-ride="carousel">
            {/*fist image*/}
            <div className="carousel-inner relative w-full overflow-hidden">

                {imagesArray.map((image, index) => {
                   return(index === 0 ?
                        <div className="carousel-item relative active float-left w-full" key={index}>
                            <img
                                src={image}
                                className="block w-full rounded-lg"
                                alt={''+ index}

                            />
                        </div>
                        :
                        <div className="carousel-item relative float-left w-full" key={index}>
                            <img
                                src={image}
                                className="block w-full  rounded-lg"
                                alt={''+ index}

                            />
                        </div>)


                })}

            </div>
            <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
