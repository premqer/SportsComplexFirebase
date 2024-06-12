import { participateInEvent } from '../firebase';
import React, { useState } from 'react';

const EventBox = ({ event, onRemove, isRemoveMode }) => {
  const [placesAvailable, setPlacesAvailable] = useState(event.placesAvailable);

  const handleParticipate = async () => {
    const success = await participateInEvent(event.id);
    if (success) {
      // Update local state with the new number of available places
      setPlacesAvailable(placesAvailable - 1);
    } else {
      alert("Failed to participate in the event");
    }
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg p-4 ${isRemoveMode ? 'cursor-pointer border-2 border-red-500' : ''}`}
      onClick={isRemoveMode ? onRemove : undefined}
    >
      <img className='w-full' src={event.image} alt="Event" />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{event.name}</div>
        <p className='text-gray-700 text-base mb-2'>Date: {event.date}</p>
        <p className='text-gray-700 text-base mb-2'>Places available: {placesAvailable}</p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'
          onClick={handleParticipate}
        >
          Participate
        </button>
      </div>
    </div>
  );
};

export { EventBox };


