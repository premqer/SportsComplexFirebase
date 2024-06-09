import React from 'react'

const EventBox = ({event, onRemove, isRemoveMode}) => {
  return (
<div
      className={`max-w-sm rounded overflow-hidden shadow-lg p-4 ${isRemoveMode ? 'cursor-pointer border-2 border-red-500' : ''}`}
      onClick={isRemoveMode ? onRemove : undefined}
    >
      <img className='w-full' src={event.image} alt="Event" />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{event.name}</div>
        <p className='text-gray-700 text-base mb-2'>Date: {event.date}</p>
        <p className='text-gray-700 text-base mb-2'>Places available: {event.placesAvailable}</p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'
          onClick={event.onParticipate}
        >
          Participate
        </button>
      </div>
    </div>
  )
}

export {EventBox}