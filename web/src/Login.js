import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { firebaseConfig } from './firebase';
// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import the authentication module

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const app = initializeApp(firebaseConfig)
  // const database = getDatabase(app)
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignIn = async() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Sign-up successful
        const user = userCredential.user;

        console.log(user.email)
        alert('Login Successfull!')
        navigate('/dashboard')
      })
      .catch((error) => {
        // Handle sign-up errors
        // const errorCode = error.code;
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
                  <h4 className="font-weight-bolder">Sign In</h4>
                  <p className="mb-0">Enter your email and password to sign in</p>
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
                      className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0" 
                      onClick={handleSignIn}>Sign in</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-4 text-sm mx-auto">
                    Don't have an account?
                    <a href="/sign-up" className="text-primary text-gradient font-weight-bold">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
  );
}