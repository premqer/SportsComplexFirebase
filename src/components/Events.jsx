import React, { useState } from 'react'
import { EventBox } from './EventBox'
import Event1Image from './img/Event1.jpg'
import { addEventToFirestore } from '../firebase';

const Events = () => {
    const [events, setEvents] = useState([
        // {
        //     image: Event1Image,
        //     name: 'Event 1',
        //     date: '6/9/2024',
        //     placesAvailable: 100,
        //     onParticipate: () => alert('Participate in Event 1')
        // }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRemoveMode, setIsRemoveMode] = useState(false);
    const [newEvent, setNewEvent] = useState({
        image: '',
        name: '',
        date: '',
        placesAvailable: '',
        // onParticipate: () => {}
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewEvent({...newEvent, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewEvent({ ...newEvent, image: reader.result });
          };
          reader.readAsDataURL(file);
        }
      };

      const handleAddEvent = () => {
        addEventToFirestore(newEvent)
          .then(() => {
            console.log('Event added successfully to Firestore');
            setEvents([...events, newEvent]);
            setIsModalOpen(false);
            setNewEvent({
              image: '',
              name: '',
              date: '',
              placesAvailable: '',
              onParticipate: () => {}
            });
          })
          .catch((error) => {
            console.error('Error adding event to Firestore: ', error);
          });
      };

    const handleRemoveEvent = (index) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
      };

  return (
<div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {events.map((event, index) => (
          <EventBox
            key={index}
            event={event}
            onRemove={() => handleRemoveEvent(index)}
            isRemoveMode={isRemoveMode}
          />
        ))}
      </div>
      <div className='mt-4'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${isRemoveMode ? 'opacity-50' : ''}`}
          onClick={() => setIsRemoveMode(!isRemoveMode)}
        >
          {isRemoveMode ? 'Cancel Remove' : 'Remove Event'}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Event</h3>
            <div className="mt-2">
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newEvent.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placesAvailable">
                    Places Available
                  </label>
                  <input
                    type="number"
                    name="placesAvailable"
                    id="placesAvailable"
                    value={newEvent.placesAvailable}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={newEvent.image}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageFile">
                    Or Upload Image
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Events