// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import {Carousel} from 'react-responsive-carousel';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React from 'react';
import Carousel from "nuka-carousel";
import Image from "next/image";

export const CarouselImages = ({moreImages}) => {
    return (
        <Carousel>
            {moreImages.map((image, index) => {
                return (
                    <img src={image} key={index} alt=""/>
                )
            })}
        </Carousel>

        // <CarouselProvider
        //     naturalSlideWidth={100}
        //     naturalSlideHeight={125}
        //     totalSlides={3}
        // >
        //     <Slider>
        //              {moreImages.map((image, index) => {
        //                  return (
        //                      <Slide index={index}  ><img src={image}  alt=""/></Slide>
        //                  )
        //              })}
        //
        //     </Slider>
        //     <ButtonBack>Back</ButtonBack>
        //     <ButtonNext>Next</ButtonNext>
        // </CarouselProvider>
        // <Carousel>
        //     {moreImages.map((image, index) => {
        //         return (
        //             <div key={index}>
        //                 <img className="object-cover" src={image} alt=""/>
        //                 {/*<p className="legend">Legend 1</p>*/}
        //             </div>
        //         )
        //     })}
        // </Carousel>
    );
};

