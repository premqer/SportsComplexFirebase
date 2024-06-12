import React, { useState, useEffect } from 'react';
import { EventBox } from './EventBox';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function addDataToFireStore(newEvent) {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      image: newEvent.image,
      name: newEvent.name,
      date: newEvent.date,
      placesAvailable: newEvent.placesAvailable,
    });
    console.log('Written with ID: ', docRef.id);
    return docRef.id; // return the ID of the newly created document
  } catch (error) {
    console.error('Error adding event', error);
    return null;
  }
}

async function fetchEventsFromFirestore() {
  const querySnapshot = await getDocs(collection(db, 'events'));
  const events = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return events;
}

async function deleteEventFromFirestore(eventId) {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    console.log('Event deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting event: ', error);
    return false;
  }
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [newEvent, setNewEvent] = useState({
    image: '',
    name: '',
    date: '',
    placesAvailable: '',
  });

  useEffect(() => {
    async function loadEvents() {
      const fetchedEvents = await fetchEventsFromFirestore();
      setEvents(fetchedEvents);
    }
    loadEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    console.log('Adding event:', newEvent);
    const eventId = await addDataToFireStore(newEvent);
    if (eventId) {
      const updatedEvents = await fetchEventsFromFirestore();
      setEvents(updatedEvents);
      setIsModalOpen(false);
      setNewEvent({
        image: '',
        name: '',
        date: '',
        placesAvailable: '',
      });
      alert('Event added successfully');
    } else {
      alert('Failed to add event');
    }
  };

  const handleRemoveEvent = async (eventId) => {
    const deleted = await deleteEventFromFirestore(eventId);
    if (deleted) {
      setEvents(events.filter(event => event.id !== eventId));
      alert('Event deleted successfully');
    } else {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventBox
            key={event.id}
            event={event}
            onRemove={() => handleRemoveEvent(event.id)}
            isRemoveMode={isRemoveMode}
          />
        ))}
      </div>
      <div className="mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
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
              <form onSubmit={handleAddEvent}>
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
                    type="date"
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
                    type="submit"
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

export default Events;
