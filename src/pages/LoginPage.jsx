import React from 'react'
import { Link } from "react-router-dom";
import { Login } from '../components/Login';

const LoginPage = () => {
  return (
    <div>
        <h1
          className='font-bold'
        >Login</h1>
        <Login />
        <p>
            Or <Link to='/register'
              className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
            >Register</Link>
        </p>
    </div>
  )
}

export default LoginPage