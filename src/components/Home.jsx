import React, { useState } from "react";
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function Home(){
    const [user, loading, error] = useAuthState(auth);

  


    return(
        <div>
            <h1>Home</h1>
            { console.log( "user information: ", user) }
            
        </div>
    )
}