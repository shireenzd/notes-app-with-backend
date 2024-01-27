import React from 'react'
import { useState } from 'react';
import { useNotesStore } from './store';

function Register() {

    
    // const [hidden, setHidden] = useState(false);
    const [registerHidden, setRigesterHidden] = useState(false)
    const [logInHidden, setLogInHidden] = useState(true)


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {setToken, token}= useNotesStore()

    const handleSubmit = async () => {
        const user = {
            name,
            email,
            password,
        };

        try {
        
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                
                throw new Error('User already exists');
            }
            const result = await response.json();
                console.log('Parsed Result:', result);
             setToken(result.token)

        } catch (error) {
            alert('User already exists');
            console.error('Registration error:', error);
        }
    };

    
    const handleLogInSubmit = async () => {
    
        const userCredentials = {
            email: email,
            password: password,
        };

        console.log('User Credentials:', userCredentials);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            
            if (response.ok) {
                const result = await response.json();
                setToken(result.token)

                console.log('Parsed Result:', result);

                if (result.error) {
                    alert(result.error);
                } 
            } else {
            
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            alert('Email and password not matching!');
            console.error('Login error:', error);
        }
    };


    const handleRegister = () => {
        setRigesterHidden(false)
        setLogInHidden(true)
    }

    const handleLogIn = () => {
        setRigesterHidden(true)
        setLogInHidden(false)
    }



    return (
        <div className='flex justify-center w-full items-center'>
            <div className='flex gap-5 items-center justify-center bg-gray-200 absolute top-5 mx-auto'>
                <div className='bg-gray-100'>
                    <h1 className='text-2xl text-center '>Welcome to the Notes App </h1>
                    <img src="./test.png" alt="welcome" />
                </div>
                <div className={registerHidden ? 'hidden' : ''}>
                    <div className=' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' >
                        <span className='flex flex-col '>
                            <label htmlFor="name" className='text-xl'>Name:</label>
                            <input type="text" name="name" id="name" className='rounded-md px-4 py-1'
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </span>
                        <span className='flex flex-col '>
                            <label htmlFor="email" className='text-xl'>Email:</label>
                            <input type="email" name="email" id="email" className='rounded-md px-4 py-1'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="password" className='text-xl'>Password:</label>
                            <input type="password" name="password" id="password" className='rounded-md px-4 py-1'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <div className='flex flex-col items-center'>
                            <button type="button" className='bg-blue-200 p-4 rounded-xl' onClick={handleSubmit}>register</button>
                            <p className='p-2 text-blue-500 underline' onClick={handleLogIn}>already have an account?</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=' register flex flex-col justify-center items-center gap-10 p-5 min-w-96 min-h-96 ' >
                        <span className='flex flex-col '>
                            <label htmlFor="exist-email" className='text-xl'>Email:</label>
                            <input type="email" name="exist-email" id="exist-email" className='rounded-md px-4 py-1'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </span>
                        <span className='flex flex-col'>
                            <label htmlFor="exist-password" className='text-xl'>Password:</label>
                            <input type="password" name="exist-password" id="exist-password" className='rounded-md px-4 py-1'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </span>
                        <div className='flex flex-col items-center'>
                            <button type="button" className='bg-blue-200 p-4 rounded-xl' onClick={handleLogInSubmit}>Log In</button>
                            <p className='p-2 text-blue-500 underline' onClick={handleRegister}>New to Notes App? Register Now!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register