import React from 'react';
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {


  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description)
    }
    // setVehiclePanel(true);
    // setPanelOpen(false);
  }
  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleSuggestionClick(suggestion)
            
          }}
          className='flex gap-4 border-2 border-gray-50 active:border-black p-3 rounded-xl items-center my-2 justify-start'
        >
          <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
            <i className='ri-map-pin-fill'></i>
          </h2>
          <h4 className='font-medium'>{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};


export default LocationSearchPanel;
