// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, runTransaction } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const addEventToFirestore = async (eventData) => {
  try {
    await addDoc(collection(db, 'events'), eventData);
    console.log('Event added to Firestore');
  } catch (error) {
    console.error('Error adding event to Firestore: ', error);
  }
};

// const fetchEventsFromFirestore = async () => {
//   try {
//     const snapshot = await firestore.collection('events').get();
//     const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     console.log('Events fetched from Firestore: ', events);
//     return events;
//   } catch (error) {
//     console.error('Error fetching events from Firestore: ', error);
//     return [];
//   }
// };

async function participateInEvent(eventId) {
  const eventRef = doc(db, 'events', eventId);
  try {
    await runTransaction(db, async (transaction) => {
      const eventDoc = await transaction.get(eventRef);
      if (!eventDoc.exists()) {
        throw "Event does not exist!";
      }
      const currentPlacesAvailable = eventDoc.data().placesAvailable;
      if (currentPlacesAvailable > 0) {
        transaction.update(eventRef, { placesAvailable: currentPlacesAvailable - 1 });
      } else {
        throw "No places available for this event!";
      }
    });
    console.log("Participation successful");
    return true;
  } catch (error) {
    console.error("Error participating in event: ", error);
    return false;
  }
}


export default app;
export {db};
export { addEventToFirestore };
export { participateInEvent };