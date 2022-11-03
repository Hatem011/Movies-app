import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function People() {
  let base_url="https://image.tmdb.org/t/p/w500/"
const [trendingPeople,setTrendingPeople]=useState([])
  async function getTrendingItems(mediaType)
  {
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
setTrendingPeople(data.results)
  }
  let navigate=useNavigate()
  function goToPeopleDetails(id)
  {
navigate(
  {
  pathname:"/PeopleDetails"
  ,search:`?id=${id}`})
  }
  useEffect(() => {
  getTrendingItems("person");  
  }, [])
  
  return (
    <>
  <div className="row">
    <div className="col-md-4">
      <div className="welcome-people">
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
      <div className="trending-people">
        <img src={base_url+person.profile_path} alt="" className='w-100' />
        <h2 className='h6'>{person.name}</h2>
      </div>
    </div>
    )}
  </div>
    </>
  )
}