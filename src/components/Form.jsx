import { useState } from "react";

import React from 'react'

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

  return (
    <div>
        <input
            className='bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500 mb-2'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
        />
        <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500
              block w-60 p-2.5 dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500
                 dark:focus:border-blue-500 mb-2'
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='password'
        />
        <button
            className='bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 rounded'
            onClick={() => handleClick(email, pass)}
        >
            {title}
        </button>
    </div>
  )
}

export {Form}