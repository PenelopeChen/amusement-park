import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Profile(){
    const [user] = useAuthState(auth);
    const [profile, setProfile] = useState(null);
    let docRef = null; 

    useEffect(()=>{
        docRef = doc(db, 'users', user.email);
        onSnapshot(docRef, (doc)=>{
            if(doc.exists){
                console.log(doc.data());
                setProfile(doc.data());
            }
        })
    }, [user]);
    

    return(
        <div>
            <h1>Profile</h1>
            { profile && (
              <div className="profile">
                <p>First Name: {profile.firstName}</p>
                <p>Last Name: {profile.lastName}</p>
                <p>Email: {profile.email}</p>
                <p>Topics: {profile.topics.join(', ')}</p>
                <p>Frequency: {profile.frequency}</p>
              </div>
            )}

            {!profile && (
                <p>Loading...</p>
            )}
        </div>
    )
}
