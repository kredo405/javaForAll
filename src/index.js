import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App';
import './utils/i18n/i18n';

const firebaseConfig = {
  apiKey: "AIzaSyDLRrP3BZZqHtVyfwjIIMnYIb0eO8NI_Dw",
  authDomain: "javaforall-e8e34.firebaseapp.com",
  projectId: "javaforall-e8e34",
  storageBucket: "javaforall-e8e34.appspot.com",
  messagingSenderId: "972217523630",
  appId: "1:972217523630:web:f12d76b7bd06285c64fc3f",
  measurementId: "G-83HGH3Q2Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);

