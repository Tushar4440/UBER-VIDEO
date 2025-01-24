import React from 'react'
import 'remixicon/fonts/remixicon.css'


const LocationSearchPanel = (props) => {

    // sample array for location...
    const locations = [
        "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
        "22C, Near Malhotra's cafe, Sheriyans Coding School, Bhopal",
        "20B, Near Singhania's cafe, Sheriyans Coding School, Bhopal",
        "18A, Near Sharma's cafe, Sheriyans Coding School, Bhopal"
    ]

    return (
        <div>
            {/* this is sample data */}
            {
                locations.map(function (e, idx) {
                    return <div key={idx} onClick={
                        ()=>{
                            props.setVehiclePanel(true)  // this will open the vehicle panel
                            props.setPanelOpen(false)  // this will close the location panel
                        }
                    } className='flex gap-4 border-2 border-gray-50 active:border-black p-3           rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                        <h4 className='font-medium'>{e}</h4>
                    </div>
                })
            }

            
        </div>
    )
}

export default LocationSearchPanel