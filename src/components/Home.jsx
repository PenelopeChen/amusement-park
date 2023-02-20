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
            <h1>Welcome Message!</h1>
            <button onClick={()=>{
                navigate("/login")
            }}>Log In</button>
            <button onClick={()=>{
                navigate("/signup")
            }}>Sign Up</button>

        </div>
        
    }
    return(
        <div>
            <h1>You have signed in</h1>
            <Profile /> 

            {/* { console.log( "user information: ", user) } */}
            <button onClick={ _logOut }> Log Out</button>
            <button onClick={()=>{navigate('/subscribe')}}>Edit Subscription</button>
            
        </div>
    )
}