import { useEffect, useState } from "react";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {

    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])



    return (
        <div className="my-20">
            <SectionTitle
            subHeading={"What Our Client Say"}
            heading={"Testimonials"} >
            </SectionTitle>

            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>

                        <div className="m-24 text-center">
                            <p className="flex justify-center mx-auto text-center">
                                <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                                />
                            </p>
                            <h2 className="my-4">{review.details}</h2>
                            <h2 className="text-2xl text-orange-400">{review.name}</h2>

                        </div>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            
        </div>
    );
};

export default Testimonials;