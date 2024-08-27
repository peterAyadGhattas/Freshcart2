import React, { useEffect, useState } from 'react'
import mainSlider from'../../../finalProject assets/finalProject assets/images/slider-image-3.jpeg'
import mainSlider2 from'../../../finalProject assets/finalProject assets/images/grocery-banner.png'
import mainSlider3 from'../../../finalProject assets/finalProject assets/images/grocery-banner-2.jpeg'
import Slider1 from'../../../finalProject assets/finalProject assets/images/slider-image-1.jpeg'
import Slider2 from'../../../finalProject assets/finalProject assets/images/slider-image-2.jpeg'
import Slider from "react-slick";
export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

    const [first, setfirst] = useState(0)
    useEffect(() => {
    
    }, [])
    
  return (
    <div className=" flex ">
    <div className="w-3/4">
    <Slider {...settings}>       
                 <img src={mainSlider} className="w-full h-[400px]" alt="Main Slider" /> 
                 <img src={mainSlider2} className="w-full h-[400px]" alt="Main Slider2" /> 
                 <img src={mainSlider3} className="w-full h-[400px]" alt="Main Slider3" /> 
               
                             </Slider>
        
    </div>
    <div className="w-1/4 ">
        <img src={Slider1} className="w-full h-[200px]" alt="Slider 1" />
        <img src={Slider2} className="w-full h-[200px]" alt="Slider 2" />
    </div>
</div>
  )
}
