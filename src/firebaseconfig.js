import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyA-YGU5-AHmtAtxoOFZTY-7ZrQlbXN4nnk',
  authDomain: 'webshop-bc01e.firebaseapp.com',
  databaseURL: 'https://webshop-bc01e-default-rtdb.firebaseio.com',
  projectId: 'webshop-bc01e',
  storageBucket: 'webshop-bc01e.appspot.com',
  messagingSenderId: '75812544824',
  appId: '1:75812544824:web:5b346f79e094e23a7ce1cd',
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

export const provider = new GoogleAuthProvider();
