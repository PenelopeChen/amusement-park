import React, { useState } from "react";
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


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
            <h1>Home</h1>
            { console.log( "user information: ", user) }
            <button onClick={ _logOut }> Log Out</button>
            
        </div>
    )
}