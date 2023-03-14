import React, { useState } from "react";
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Profile from "./Profile";

export default function Home(){
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    // const auth = getAuth();

    const _logOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    if(!user){
        return <div>
            <h1>LUNA PARK NEWSLETTER</h1>

            <p className="punchline">Join our newsletter now and get a<strong> $50 voucher </strong>for your next visit.</p>

            <img src="https://i.imgur.com/vsx38IJ.png" alt="ferris wheel" />

            <p className="punchline2">Join us today in this crazy ride to get the latest in our special offers, events and community news, all just for you!</p>

            <p className="trust">We just need some info to be able to contact you when it is needed only, the safety of this information is valuable to us so it will not be shared or sold to third parties.</p>

            <div className="home-btns">
                <button onClick={()=>{
                    navigate("/login")
                }}>Log In</button>
                <br />
                <button onClick={()=>{
                    navigate("/signup")
                }}><strong>Sign Up Now</strong></button>
            </div>
        </div>
        
    }
    return(
        <div>
            <h1>You have signed in</h1>
            <Profile /> 

            {/* { console.log( "user information: ", user) } */}
            <button onClick={ _logOut }> Log Out</button>
            <br/>
            <button onClick={()=>{navigate('/subscribe')}}>Edit Subscription</button>
            
        </div>
    )
}