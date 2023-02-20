import React from "react";
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Select from 'react-select'

export default function Subscribe(){
    const [user, loading, error] = useAuthState(auth);

    const currentUser = user? user.email : null;
    console.log(currentUser);

    const options = [
        { value: 'Topic 1', label: 'Topic 1: Scary Movie' },
        { value: 'Topic 2', label: 'Topic 2: Lunar Park' },
        { value: 'Topic 3', label: 'Topic 3: Hello World' }
      ]

    return (
        <div>
            <h1>Subscribe</h1>
            <p>You have logged in using :{currentUser}</p>
            <Select
                closeMenuOnSelect={false}
                defaultValue={[options[0]]}
                isMulti
                options={options}
            />
        </div>
    )
}