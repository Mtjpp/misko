import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Home(){
  const [user, setUser] = useState(null);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); // Pass the Firebase app instance to getAuth

  useEffect(() => {
    // Set up the authentication state change listener
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, [auth]);

  
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
      </header>
    </div>
    )
}