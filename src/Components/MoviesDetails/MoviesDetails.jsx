import axios from 'axios'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
export default function MoviesDetails() {
  let base_url="https://image.tmdb.org/t/p/w500/"
  let [searchParams,setSearchParams]=useSearchParams();
  let [details,setDetails]=useState({})
  let currentId=searchParams.get('id')
  async function getTrendingDetails(mediaType)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/${mediaType}/${currentId}%7D?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`)
setDetails(data)
  }
useEffect(() => {
 getTrendingDetails("movie",currentId)
}, [])
  return (
    <>
    <div className="row">
      <div className="col-md-4">
        <img src={base_url+details.poster_path} alt="" className='w-100' />
      </div>
      <div className="col-md-8 text-center mt-5">
      <h2>{details.title}</h2>
      <h5>{details.original_title}</h5>
      <p>{details.overview}</p>
      </div>
    </div>
    </>
  )
}
