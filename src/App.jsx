import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Tvshows from './Components/Tvshows/Tvshows';
import People from './Components/People/People';
import Movies from "./Components/Movies/Movies"
import MoviesDetails from './Components/MoviesDetails/MoviesDetails';
import Notfound from './Components/Notfound/Notfound';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import TvShowsDetails from './Components/TvShowsDetails/TvShowsDetails';
import jwtDecode from 'jwt-decode';
import { useState,useEffect } from 'react';
import { Routes,Route, useNavigate,Navigate } from 'react-router-dom';
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
  function ProtectedRoute(props)
  {
if(localStorage.getItem("userToken")==null)
{
return <Navigate to="/login"/>
}
else
{
return props.children;
}
  }
  return (
    <>
   <Navbar userData={userData} logout={logout}/>
   <div className="container">
   <Routes>
   <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='home' element={<ProtectedRoute>{<Home/>}</ProtectedRoute>}></Route>
      <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
      <Route path='login' element={<Login saveUserData={saveUserData}/>}></Route>
      <Route path='tvshows' element={<ProtectedRoute> <Tvshows/></ProtectedRoute>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
      <Route path='MoviesDetails' element={<ProtectedRoute><MoviesDetails/></ProtectedRoute>}></Route>
      <Route path='TvShowsDetails' element={<ProtectedRoute><TvShowsDetails/></ProtectedRoute>}></Route>
      <Route path='PeopleDetails' element={<ProtectedRoute><PeopleDetails/></ProtectedRoute>}></Route>
      <Route path="*" element={<Notfound/>}></Route>
    </Routes>
   </div>
    </>
  );
}
export default App;