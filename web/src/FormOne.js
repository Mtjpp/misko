import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { firebaseConfig } from './firebase';
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import the authentication module

export default function FormOne() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const app = initializeApp(firebaseConfig)
  // const database = getDatabase(app)
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-up successful
        const user = userCredential.user;

        alert('Created!');
        navigate('/sign-in');
      })
      .catch((error) => {
        // Handle sign-up errors
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage)
      });
  };

  return (
    <div className="page-header min-vh-100">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
              <div className="card card-plain">
                <div className="card-header pb-0 text-start">
                  <h4 className="font-weight-bolder">Sign Up</h4>
                </div>
                <div className="card-body">
                  <form role="form">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-dark w-100 my-4 mb-2"
                        onClick={handleSignUp}
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Already have account? 
                        <a href="/sign-in" className="text-dark text-gradient font-weight-bold"> Sign in</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}