import React from 'react'
import { useState } from 'react';

function Register() {

    const [hidden, setHidden] = useState(false);
    const [registerHidden, setRigesterHidden] = useState(false)
    const [logInHidden, setLogInHidden] = useState(true)


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = () => {
        const user = {
            name,
            email,
            password,
          };
      
          // Send the object to the database using a POST request.
          fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server.
          })
          .catch((error) => {
            // Handle the error.
          });
        setHidden(true);

    };

    const handleLogIn = () => {
        setRigesterHidden(true)
        setLogInHidden(false)
    }

    const handleRegister = () => {
        setRigesterHidden(false)
        setLogInHidden(true)
    }



    return (
        <div className={hidden ? 'hidden' : 'flex justify-center w-full items-center'}>
            <div className='flex gap-5 items-center justify-center bg-gray-200 absolute top-5 mx-auto'>
                <div className='bg-gray-100'>
                    <h1 className='text-2xl text-center '>Welcome to the Notes App </h1>
                    <img src="./test.png" alt="welcome" />
                </div>
                <div className={registerHidden ? 'hidden' : ''}>
                    <div className=' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' >
                        <span className='flex flex-col '>
                            <label htmlFor="name" className='text-xl'>Name:</label>
                            <input type="text" name="name" id="name" className='rounded-md px-4 py-1' />
                        </span>
                        <span className='flex flex-col '>
                            <label htmlFor="email" className='text-xl'>Email:</label>
                            <input type="email" name="email" id="email" className='rounded-md px-4 py-1' />
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="password" className='text-xl'>Password:</label>
                            <input type="password" name="password" id="password" className='rounded-md px-4 py-1' />
                        </span>
                        <div className='flex flex-col items-center'>
                            <button type="button" className='bg-blue-200 p-4 rounded-xl' onClick={handleSubmit}>register</button>
                            <p className='p-2 text-blue-500 underline' onClick={handleLogIn}>already have an account?</p>
                        </div>
                    </div>
                </div>
                <div className={logInHidden ? 'hidden' : ''}>
                    <div className=' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' >
                        <span className='flex flex-col '>
                            <label htmlFor="email" className='text-xl'>Email:</label>
                            <input type="email" name="email" id="email" className='rounded-md px-4 py-1' />
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="password" className='text-xl'>Password:</label>
                            <input type="password" name="password" id="password" className='rounded-md px-4 py-1' />
                        </span>
                        <div className='flex flex-col items-center'>
                            <button type="button" className='bg-blue-200 p-4 rounded-xl' onClick={handleSubmit}>Log In</button>
                            <p className='p-2 text-blue-500 underline' onClick={handleRegister}>New to Notes App? Register Now!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register