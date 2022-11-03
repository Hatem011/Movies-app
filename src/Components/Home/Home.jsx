import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
export default function Home() {
  let base_url="https://image.tmdb.org/t/p/w500/"
const [trendingMovies,setTrendingMovies]=useState([]);
const [trendingTvShows,setTrendingTvShows]=useState([]);
const [trendingPeople,setTrendingPeople]=useState([])
  async function getTrendingItems(mediaType,callback)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
callback(data.results)
// setTrendingMovies(data.results)
  }
  let navigate=useNavigate()
  function goToMoviesDetails(id)
  {
navigate(
  {
  pathname:"/MoviesDetails"
  ,search:`?id=${id}`})
  }
  function goToTvShowsDetails(id)
  {
navigate(
  {
  pathname:"/TvShowsDetails"
  ,search:`?id=${id}`})
  }
  function goToPeopleDetails(id)
  {
navigate(
  {
  pathname:"/PeopleDetails"
  ,search:`?id=${id}`})
  }
  useEffect(() => {
  getTrendingItems("movie",setTrendingMovies);  
  getTrendingItems("tv",setTrendingTvShows);  
  getTrendingItems("person",setTrendingPeople);  
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
    <div onClick={()=>goToMoviesDetails(movie.id)} key={movie.id} className="col-md-2">
      <div className="trending-movie my-3">
        <img src={base_url+movie.poster_path} alt="" className='w-100' />
        <h2 className='h6'>{movie.title}</h2>
      </div>
    </div>
    )}
  </div>
  <div className="row">
    <div className="col-md-4">
      <div className="welcome-movies">
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
  <div className="row">
    <div className="col-md-4">
      <div className="welcome-movies">
      <div className="brdr w-25  my-3"></div>
      <h2>Welcome</h2>
      <h2>people</h2>
      <h2>To Watch Know</h2>
      <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      <div className="brdr w-100 my-3"></div>
      </div>
    </div>
    {trendingPeople.map((person)=>
    <div onClick={()=>goToPeopleDetails(person.id)} key={person.id} className="col-md-2">
      <div className="trending-people my-3">
        <img src={base_url+person.profile_path} alt="" className='w-100' />
        <h2 className='h6'>{person.name}</h2>
      </div>
    </div>
    )}
  </div>
    </>
  )
}
