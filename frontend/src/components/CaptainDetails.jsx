import React, { useContext } from 'react'
import 'remixicon/fonts/remixicon.css'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainDetails = () => {

  const { captain } = useContext(CaptainDataContext)
  // console.log(captain)
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9WLaioLPGw1dtBAMqN_rdhoIMoxh5g9aAFg&s" alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstName + " " + captain.fullname.lastName}</h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹295.20</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex p-2 mt-6 bg-gray-100 rounded-xl items-start justify-center gap-4'>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails