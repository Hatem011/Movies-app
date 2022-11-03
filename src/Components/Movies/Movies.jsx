import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Movies() {
  let base_url="https://image.tmdb.org/t/p/w500/"
const [trendingMovies,setTrendingMovies]=useState([])
  async function getTrendingItems(mediaType)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
setTrendingMovies(data.results)
  }
  let navigate=useNavigate()
  function gotoToDetails(id)
  {
navigate(
  {
  pathname:"/MoviesDetails"
  ,search:`?id=${id}`})
  }
  useEffect(() => {
  getTrendingItems("movie");  
  }, [])
  
  return (
    <>
  <div className="row">
    <div className="col-md-4">
      <div className="welcome-movies">
      <div className="brdr w-25  my-3"></div>
      <h2>Welcome</h2>
      <h2>Movies</h2>
      <h2>To Watch Know</h2>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <div className="brdr w-100 my-3"></div>
      </div>
    </div>
    {trendingMovies.map((movie)=>
    <div onClick={()=>gotoToDetails(movie.id)} key={movie.id} className="col-md-2">
      <div className="trending-movie my-3">
        <img src={base_url+movie.poster_path} alt="" className='w-100' />
        <h2 className='h6'>{movie.title}</h2>
      </div>
    </div>
    )}
  </div>
    </>
  )
}
