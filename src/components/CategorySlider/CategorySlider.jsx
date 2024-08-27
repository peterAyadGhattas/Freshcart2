import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function CategorySlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true
      };

      const [Categories, setCategories] = useState([])
function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
        setCategories(data.data);
    })
    .catch((err)=>{

    })
}

 
useEffect(() => {
    getCategories();},[]);

 

  return (
    <div className="py-5">
        <h2 className=' flex justify-start  py-4 text-gray-800 text-2xl font-light '>Shop Popular Category</h2>
    <Slider {...settings}>
                  
  {Categories.map((category)=> <div>
    <img className='height-category w-full' src={category.image} alt={category.name}/>
    <h2 className='mt-2 font-light'>{category.name}</h2>
  </div>)}

             </Slider>
 </div> )
}
