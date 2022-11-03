import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Tvshows from './Components/Tvshows/Tvshows';
import People from './Components/People/People';
import Movies from "./Components/Movies/Movies"
import { Routes,Route, useNavigate } from 'react-router-dom';
import MoviesDetails from './Components/MoviesDetails/MoviesDetails';
import Notfound from './Components/Notfound/Notfound';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import TvShowsDetails from './Components/TvShowsDetails/TvShowsDetails';
import jwtDecode from 'jwt-decode';
import { useState,useEffect } from 'react';
function App() {
  const [userData, setUserData] = useState(null)
  let navigate=useNavigate()
  function saveUserData()
  {
let encodedToken=localStorage.getItem("userToken");
let decodeToken=jwtDecode(encodedToken);
setUserData(decodeToken);
console.log(decodeToken);
  }
  function logout()
  {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login")
  }
  useEffect(() => {
    if(localStorage.getItem("userToken")!=null)
    {
      saveUserData()
    }
  }, [])
  
  return (
    <>
   <Navbar userData={userData} logout={logout}/>
   <div className="container">
   <Routes>
   <Route path='/' element={<Register/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='movies' element={<Movies/>}></Route>
      <Route path='login' element={<Login saveUserData={saveUserData}/>}></Route>
      <Route path='tvshows' element={ <Tvshows/>}></Route>
      <Route path='register' element={ <Register/>}></Route>
      <Route path='people' element={<People/>}></Route>
      <Route path='MoviesDetails' element={<MoviesDetails/>}></Route>
      <Route path='TvShowsDetails' element={<TvShowsDetails/>}></Route>
      <Route path='PeopleDetails' element={<PeopleDetails/>}></Route>
      <Route path="*" element={<Notfound/>}></Route>
    </Routes>
   </div>
    </>
  );
}
export default App;