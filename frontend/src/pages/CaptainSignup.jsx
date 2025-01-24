import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [userData, setUserData] = useState({})

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const CaptainData = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, CaptainData)
    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  return (
    <div className='bg-[#c4eaef] p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's name?</h3>
          <div className='flex gap-4 mb-6'>
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type='text' placeholder='First name' />
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' value={lastName} onChange={(e) => {
                setLastName(e.target.value)
              }} type='text' placeholder='Last name' />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email?</h3>
          <input required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base' value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} type='email' placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base' value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} type='password' placeholder='password' />

          <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
          <div className='flex gap-4 mb-6'>
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              type='text'
              placeholder='Vehicle Color'
            />
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              type='text'
              placeholder='Vehicle Plate Number'
            />
          </div>

          <div className='flex gap-4 mb-6'>
            <input required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              type='number'
              placeholder='Vehicle Capacity'
            />
            <select required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button required className='bg-[#000000] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Create a Captain account   </button>
        </form>
        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply...</p>
      </div>
    </div>
  )
}

export default CaptainSignup