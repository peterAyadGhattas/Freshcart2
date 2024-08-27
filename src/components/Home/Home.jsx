import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Home() {
const [products, setproducts] = useState([])
const [isLoading, setIsLoading] = useState(true)


useEffect(()=> {
  getProducts()
})
  async function getProducts() {
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setproducts(data.data);
    setIsLoading(false);
    
  }
  return (
   <>
{isLoading?<LoadingScreen/>: <div>

   
   <MainSlider/>
   <CategorySlider/>
  <div className="grid grid-cols-4 gap-3">
{products.map((product , index)=>{
  return <Product product={product} key={index}/>
   
})}
</div>
</div>}
   </>
  )
}
