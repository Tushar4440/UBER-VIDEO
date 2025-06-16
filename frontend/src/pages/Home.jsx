import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', {state: { ride}})
  })


  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }

  socket.on('ride-confirmed', ride => {
    setWaitingForDriver(true)
    setConfirmRidePanel(false)
    setVehiclePanel(false)
    setVehicleFound(false)
    setRide(ride)
  })

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data);
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  useEffect(() => {
    if (pickup) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`)
        .then(response => {
          setPickupSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching pickup suggestions:', error);
        });
    }
  }, [pickup]);

  useEffect(() => {
    if (destination) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-destination`)
        .then(response => {
          setDestinationSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching destination suggestions:', error);
        });
    }
  }, [destination]);

  const panelChange = () => {
    setPanelOpen(!panelOpen);
  };

  const handleClick = () => {
    panelChange();
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [waitingForDriver]);

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
      <div className='h-screen w-screen'>
        {/* <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt='' /> */}
        <LiveTracking/>
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[33%] bg-white p-6 top-0 relative'>
          <div className='flex justify-between'>
            <h4 className='text-2xl font-semibold pt-2 '>Find a trip</h4>
            <button ref={panelCloseRef} className='opacity-0 text-4xl border-white' onClick={handleClick}>
              <i className='ri-arrow-down-wide-line'></i>
            </button>
          </div>

          <form onSubmit={submitHandler}>
            <div className='line absolute h-16 w-1 top-[38%] left-10 bg-gray-800 rounded-full'></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
              value={pickup}
              onChange={handlePickupChange}
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type='text'
              placeholder='Enter your destination'
              value={destination}
              onChange={handleDestinationChange}
            />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white text-lg font-semibold rounded-lg w-full py-2 mt-5' >
            Find Trip
          </button>

        </div>
        <div ref={panelRef} className='bg-white h-[0]'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
