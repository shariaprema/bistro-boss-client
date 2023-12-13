import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from "../../../assets/image/home/slide1.jpg"
import slide2 from "../../../assets/image/home/slide2.jpg"
import slide3 from "../../../assets/image/home/slide3.jpg"
import slide4 from "../../../assets/image/home/slide4.jpg"
import slide5 from "../../../assets/image/home/slide5.jpg"
import SectionTitle from '../../../component/SectionTitle/SectionTitle';



const Category = () => {
    return (
      <section>
        <SectionTitle 
         subHeading={"From 11.00am to 10.00pm"}
         heading={"Order Online"}
        
        >
       
        </SectionTitle>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mb-20 text-red-600 "
        >
          <SwiperSlide>
            <img className='flex justify-center items-center mx-auto ' src={slide1} alt="" />
            <h2 className='uppercase text-2xl text-white text-center font-semibold  -mt-16 '>Salads</h2>
          </SwiperSlide>
        
          <SwiperSlide>
            <img className='flex justify-center items-center mx-auto ' src={slide2} alt="" />
            <h2 className='uppercase text-2xl text-white text-center font-semibold  -mt-16 '>Pizzas</h2>
            </SwiperSlide>

          <SwiperSlide>
            <img className='flex justify-center items-center mx-auto ' src={slide3} alt="" />
            <h2 className='uppercase text-2xl text-white text-center font-semibold -mt-16 '>Soups</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img className='flex justify-center items-center mx-auto ' src={slide4} alt="" />
            <h2 className='uppercase text-2xl text-white text-center font-semibold -mt-16 '>Pizzas</h2> 
          </SwiperSlide>
          <SwiperSlide>
            <img className='flex justify-center items-center mx-auto  ' src={slide5} alt="" />
            <h2 className='uppercase text-2xl text-white text-center font-semibold -mt-16 '>Dessert</h2> 

          </SwiperSlide>
          
        </Swiper>

      </section>
        
    );
};

export default Category;