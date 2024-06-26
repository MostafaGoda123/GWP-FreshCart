import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import Slider from "react-slick";
import { Helmet } from 'react-helmet'

export default function ProductDetail({addToCart}) {
   let settings = {
      dots: false,
      autoplay:true,
      autoplaySpeed:2000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false 
   };
   async function postToCart(productId){
      let {data} = await addToCart(productId);
      console.log(data);
   }

   let {id} = useParams()
   const [details, setDetails] = useState({})
   const [loading, setLoading] = useState(true)
   async function getDetails() {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setDetails(data.data)
      setLoading(false)
   }
   useEffect(() => {
      getDetails()
   }, [])

   return <>
      {
         loading ?
         <div className="d-flex justify-content-center m-5">
            <SyncLoader size={15} color="#0aad0a" />
         </div>
         :
         <div className="row align-items-center py-5">
            <Helmet>
               <meta charSet="utf-8" />
               <title>{details.title}</title>
            </Helmet>
            <div className="col-md-4">
               <Slider {...settings}>
                  {details.images.map( (img , index) => <img src={img} key={index} className='w-100' alt={details.title} /> )}
               </Slider>
            </div>
            <div className="col-md-8">
               <div className="details p-2 rounded-1">
                  <h3 className='h5'>{details.title}</h3>
                  <p>{details.description}</p>
                  <span className="mb-2 font-sm">{details.category.name}</span>
                  <div className="d-flex mb-2 justify-content-between align-items-center font-sm">
                     <span>{details.price} EGP</span>
                     <span><i className="fas fa-star rating-color me-1"></i>{details.ratingsAverage}</span>
                  </div>
                  <button onClick={()=>postToCart(id)} className="btn bg-main text-white w-100 btn-sm">Add to cart</button>
               </div>
            </div>
         </div>
      }
   </>
}

