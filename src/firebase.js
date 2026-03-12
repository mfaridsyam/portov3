import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, onValue, query, orderByChild, goOnline } from 'firebase/database'

const firebaseConfig = {
  apiKey:            "AIzaSyAVkELkM42NoWZoghAlfNR-IeViZSvsWYc",
  authDomain:        "m-farid-syam.firebaseapp.com",
  databaseURL:       "https://m-farid-syam-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "m-farid-syam",
  storageBucket:     "m-farid-syam.firebasestorage.app",
  messagingSenderId: "876111662870",
  appId:             "1:876111662870:web:0f0f8d83a4db6bbe254a37"
}

const app      = initializeApp(firebaseConfig)
const database = getDatabase(app)
goOnline(database)

export { database, ref, push, onValue, query, orderByChild }