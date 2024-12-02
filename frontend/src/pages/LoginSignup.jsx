import React, { useState } from 'react';
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  let [userData,setUserData]=useState({
    username:"",
    email:"",
    password:"",
  })

  let inputChangeHandler=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  let signup=async()=>{
    console.log(userData);
   const data= await fetch('http://localhost:3000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify(userData),
    })
    const response = await data.json();
    console.log(response);
    if(response.success){
      localStorage.setItem('auth-token',response.token);
      window.location.replace('/');
    }else{
      alert(response.message);
    }

  }

  
  let login=async()=>{
    console.log(userData);
   const data= await fetch('http://localhost:3000/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify(userData),
    })
    const response = await data.json();
    console.log(response);
    if(response.success){
      localStorage.setItem('auth-token',response.token);
      window.location.replace('/');
    }else{
      alert(response.message);
    }
  }
 
  const [state, SetState] = useState("Signup");
  return (
    <div className='LoginSignup-container'>
      <div className="LoginSignup-input-fields">
        <h1>{state}</h1>
        {
          state === "Signup" ? (
            <input type="text" placeholder='Your name' onChange={inputChangeHandler} name="username" value={userData.name}/>
          ) : (
            <></>
          )
        }
        <input type="text" placeholder='Email address' onChange={inputChangeHandler}  name="email" value={userData.email} />
        <input type="text" placeholder='Password' onChange={inputChangeHandler} name='password' value={userData.password} />
        <button onClick={state==="Signup"?()=>{signup()}:()=>{login()}}>Continue</button>
        {
          state === "Signup" ?
            (<p>Already have an account ? <span onClick={() => {
              SetState("Login")
            }}>Login here</span></p>
            ) :
            (<p>create a new account ? <span onClick={() => {
              SetState("Signup")
            }}>Click here</span></p>
            )
        }

        <div className='LoginSignup-check-condition'>
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>

        </div>
      </div>
    </div>
  )
}

export default LoginSignup
