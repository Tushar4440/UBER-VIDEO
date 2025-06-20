import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative flex flex-col justify-end'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />
        <Link to='/captain-home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      
      <div className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative' onClick={() => {
        setFinishRidePanel(true)
      }}>
        <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

        }}><i className='text-3xl text-gray-800 ri-arrow-up-wide-line'></i></h5>
        <h4 className='text-xl font-semibold'>4 Km away</h4>
        <button className=' bg-green-500 text-white font-semibold p-3 px-8 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel} />
      </div>

      <div className='h-screen fixed w-screen top-0 z-[-1]'>
        {/* <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt='' /> */}
         <LiveTracking/> 
      </div>
    </div>
  )
}

export default CaptainRiding