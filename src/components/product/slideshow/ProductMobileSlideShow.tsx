'use client'

import {Swiper, SwiperSlide} from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from "next/image";


interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }:Props) => {

  return (
    <div className={className}>

      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination={true}
        autoplay= {
          {
            delay: 2500
          }
        }
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
        >

        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                className="object-fill"
                width={ 600 }
                height={500}
                src={`/products/${image}`}
                alt={title} />
            </SwiperSlide>
          ))
        }
        
      </Swiper>
    </div>
  )
}