import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'   //^ axios :- simplifies the process of working with APIs and handling HTTP requests
import {UserDataContext} from '../context/UserContext'


const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()
    const newUser=({
      fullname : {
        firstname : firstName,
        lastname: lastName
      },
      email: email,
      password : password,
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status == 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setPassword('')
    setLastName('')
  }

  return (
    <div className='bg-[#c4eaef] p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-4 mb-6'>
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} type='text' placeholder='First name' />
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' value={lastName} onChange={(e)=>{
                setLastName(e.target.value)
              }} type='text' placeholder='Last name' />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base' value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base' value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} type='password' placeholder='password' />
          <button required className='bg-[#000000] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Create account</button>
        </form>
        <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply...</p>
      </div>
    </div>
  )
}

export default UserSignUp