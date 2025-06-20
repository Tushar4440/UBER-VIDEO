import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const captainData = ({
            email: email,
            password: password
        })
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)

        if (response.status === 200) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        setEmail('')
        setPassword('')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = ({
            email: email,
            password: password
        })
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)

        if (response.status === 200) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }


        setEmail('')
        setPassword('')
    }
    return (
        <div className='bg-[#c4eaef] p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                    <input required value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='email' placeholder='email@example.com' />
                    <h3 className='text-lg font-medium mb-2'>Password</h3>
                    <input required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='password' placeholder='password' />
                    <button onTouchEnd={(e)=>handleSubmit(e)} type='submit' required className='bg-[#000000] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Login</button>
                </form>
                <p className='text-center'>Want to join us? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain </Link></p>
            </div>
            <div>
                <Link to='/login' className='bg-[#ae7958] flex items-center justify-center text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin