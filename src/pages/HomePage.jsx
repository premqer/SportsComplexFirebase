import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuth, email} = useAuth();
  return isAuth ? (
    <div className='grid gap-4 place-items-start'>
      <h1 className='font-bold text-2xl mb-4'>Welcome</h1>
      <button className='bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 rounded w-32'
        onClick={() => navigate('/Events')}
      >Events</button>
      <button className=''
        onClick={() => dispatch(removeUser())}
      >Log out from {email}</button>
    </div>
  ) : (
      <Navigate to='/login' />
  )
}

export default HomePage