import React from 'react';
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='LoginSignup-container'>
      <div className="LoginSignup-input-fields">
        <h1>Signup</h1>
        <input type="text" placeholder='Your name' />
        <input type="text" placeholder='Email address' />
        <input type="text" placeholder='Password' />
        <button>Continue</button>
        <p>Already have an account ? <span>Login here</span></p>
        <div className='LoginSignup-check-condition'>
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>

        </div>
      </div>
    </div>
  )
}

export default LoginSignup
