import React from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login(props) {
  let [user,setUser]=useState({
    email:'',
    password:''
})
const navigate=useNavigate()
function goToHome()
{
navigate('/home')
}
let [ErrorMsg,setErrorMsg]=useState('')
let [errorsList,setErrorsList]=useState([])
let [loadingIcon,setLoadingIcon]=useState(false)
async function submitFormData(e)
{
e.preventDefault();
setLoadingIcon(true)
let validationResponse=validateForm()
console.log(validationResponse);
if(validationResponse.error)
{
setErrorsList(validationResponse.error.details)
}
else{
let {data} =await axios.post('https://route-movies-api.vercel.app/signin',user);
console.log(data);
if(data.message=='success')
{
  localStorage.setItem('userToken',data.token)
  props.saveUserData()
  goToHome()
}
else
{
   setErrorMsg(data.message)
}
}
setLoadingIcon(false)
}

function validateForm()
{
const schema=Joi.object({
email:Joi.string().required().email({tlds:{allow:['com','net']}}),
password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
})
return schema.validate(user,{abortEarly:false})
}
function getValue(e)
{
let myUser={...user}
myUser[e.target.name]=e.target.value;
setUser(myUser)
console.log(myUser);
}
return (
<>
<div className='w-75 m-auto my-3'>
<h1>Login Form</h1>
{errorsList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>)}
{ErrorMsg?<div className='alert alert-danger'>{ErrorMsg}</div>:''} 
<form onSubmit={submitFormData}>
<div className='input-gp my-2'>
<label htmlFor="">Email : </label>
<input onChange={getValue} type="email" name='email' className='form-control' />
</div>
<div className='input-gp my-2'>
<label htmlFor="">Password : </label>
<input onChange={getValue} type="password" name='password' className='form-control' />
</div>
<button className='btn btn-danger d-flex float-end' type='submit'>
 {loadingIcon?<i className='fa fa-spinner fa-spin'></i>:'Login' }
    </button>
<div className="clear-fix"></div>
</form>
</div>
</>
)
}
