import React from 'react'
import Slider from "react-slick";
export default function ProductImageSlider({images}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
   <>
  <Slider {...settings}>
                  
               {  images?.map((img) => {
                   return  <img className=" w-full rounded-md object-contain mx-auto " src={img } alt=" product pic"/>
})
                    }  
                  
                        </Slider>

   </>
  )
}
