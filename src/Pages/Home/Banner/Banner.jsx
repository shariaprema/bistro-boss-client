import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import pic1 from "../../../assets/image/home/01.jpg"
import pic2 from "../../../assets/image/home/02.jpg"
import pic3 from "../../../assets/image/home/03.png"
import pic4 from "../../../assets/image/home/04.jpg"
import pic5 from "../../../assets/image/home/05.png"
import pic6 from "../../../assets/image/home/06.png"
import React from "react";
const Banner = () => {

    

    return (
       
             <Carousel >
                
                <div>
                    <img src={pic1} />
                </div>
                <div>
                    <img src={pic2} />
                </div>
                <div>
                    <img src={pic3} />
                </div>
                <div>
                    <img src={pic4} />
                </div>
                <div>
                    <img src={pic5} />
                </div>
                <div>
                    <img src={pic6} />
                </div>
            </Carousel>
        
            
        
    );
};

export default Banner;