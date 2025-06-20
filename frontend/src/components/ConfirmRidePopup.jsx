import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ConfirmRidePopup = (props) => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePopupPanel(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this Ride to start</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg '>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5>2.2km</h5>
            </div>


            <div className='flex flex-col gap-2 justify-between items-center'>

                <div className='w-full mt-4'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600 -mt-1'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Cash Cash</p>
                        </div>
                    </div>

                </div>
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input value={otp} onChange={(e) => {
                            setOtp(e.target.value)
                        }} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
                        <button type="submit" onClick={() => {
                        }} className='w-full mt-5 bg-green-500 text-lg text-white font-semibold p-3 flex justify-center rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }} className='w-full mt-1 bg-red-500 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup