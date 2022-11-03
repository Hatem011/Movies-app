import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function TvShows() {
  let base_url="https://image.tmdb.org/t/p/w500/"
const [trendingTvShows,setTrendingTvShows]=useState([])
  async function getTrendingItems(mediaType)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
setTrendingTvShows(data.results)
console.log(data.results);
  }
  useEffect(() => {
  getTrendingItems("tv");  
  }, [])
  let navigate=useNavigate()
  function goToTvShowsDetails(id)
  {
navigate(
  {
    pathname:"/TvShowsDetails",
    search:`?id=${id}`
  }
)
  }
  return(
<div className="row">
    <div className="col-md-4">
      <div className="welcome-tvShows">
      <div className="brdr w-25  my-3"></div>
      <h2>Welcome</h2>
      <h2>Tv Shows</h2>
      <h2>To Watch Know</h2>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <div className="brdr w-100 my-3"></div>
      </div>
    </div>
    {trendingTvShows.map((tv)=>
    <div onClick={()=>goToTvShowsDetails(tv.id)} key={tv.id} className="col-md-2">
      <div className="trending-tv my-3">
        <img src={base_url+tv.poster_path} alt="" className='w-100' />
        <h2 className='h6'>{tv.name}</h2>
      </div>
    </div>
    )}
  </div>
  )
}