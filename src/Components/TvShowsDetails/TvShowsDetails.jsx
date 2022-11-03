import axios from 'axios'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
export default function TvShowsDetails() {
  let base_url="https://image.tmdb.org/t/p/w500/"
  let [searchParams,setSearchParams]=useSearchParams();
  let [tvShowsDetails,setTvShowsDetails]=useState({})
  let currentId=searchParams.get('id')
  async function getTrendingDetails(mediaType)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/${mediaType}/${currentId}%7D?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`)
setTvShowsDetails(data)

  }
useEffect(() => {
 getTrendingDetails("tv",currentId)
}, [])
  return (
    <>
    <div className="row">
      <div className="col-md-4">
        <img src={base_url+tvShowsDetails.poster_path} alt="" className='w-100' />
      </div>
      <div className="col-md-8 text-center mt-5">
      <h2>{tvShowsDetails.name}</h2>
      <h5>{tvShowsDetails.original_name}</h5>
      <p>{tvShowsDetails.overview}</p>
      </div>
    </div>
    </>
  )
}
