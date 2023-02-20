import React, { useEffect, useState } from "react";
import { auth, db } from '../firebase';
import {doc, setDoc, addDoc} from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";


export default function Subscribe(){
    const navigate = useNavigate(); 

    
    const [user, loading, error] = useAuthState(auth);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [topics, setTopics] = useState([]);
    const [frequency, setFrequency] = useState('');
    const [subStatus, setSubStatus] = useState(false);

    // states for Select 
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    useEffect(()=>{
        if(user){
            setEmail(user.email);
        }
    })

    // name validity check 
    const nameValidity = (name) => {
        if (!name) {
            return "Name is required";
        }
        if (name.match(/\d/)) {
            return "Name cannot contain a number";
        }
        if (name.match(/[^a-zA-Z]/)) {
            return "Name cannot contain a special character";
        }
        if (name.length < 2) {
            return "Name must be at least two letters";
        }
        return "";
    }
    

    // handle the name input
    const _handleName = (e, stateToUpdate) => {
        const value = e.target.value;
        const nameError = nameValidity(value);
        setErrorMsg(nameError);
        
        if (stateToUpdate === "firstName") {
          setFirstName(value);
        } else if (stateToUpdate === "lastName") {
          setLastName(value);
        }
      };
      

    // variables for Select 
    const topicsOptions = [
        { value: 'Special Offers', label: 'Special Offers' },
        { value: 'Special Events', label: 'Special Events' },
        { value: 'Community News', label: 'Community News' }
      ]

    const frequencyOptions = [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ]

    // handle the topics input
    const _handleTopics = (e) => {
        const topicValues = e ? e.map((topic) => topic.value) : [];
        setTopics(topicValues);
      };
      
    // handle the frequency input
    const _handleFrequency = (e)=>{
        const frequencyValue = e? e.value : '';
        setFrequency(frequencyValue);
    }

    // handle submit click 
    const _handleSubmit = async (e) => {
        e.preventDefault();
        if(email && firstName && lastName && topics && frequency) {
            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

          const dataToFirestore = {
            email: email,
            firstName: capitalizedFirstName,
            lastName: capitalizedLastName,
            topics: topics,
            frequency: frequency
          };
      
          const docRef =  doc(db, 'users', email);
          try {
            await setDoc(docRef, dataToFirestore);
            console.log("Data added to Firestore");
            setSubStatus(true);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
        
      }
    
    useEffect(() => {
        if(subStatus){
            navigate('/');
        }
    }, [subStatus])
      
    useEffect(() => {
        console.log(topics);
        console.log(frequency);
    },[topics, frequency])

    return (
        <div>
            <h1>Subscribe</h1>
            <p>You have logged in using :{ email? email:"loading..." }</p>
            <form onClick={ _handleSubmit }>
                <section>
                {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
                First Name 
                <input type="text" value={ firstName } onInput={(e) => _handleName(e, "firstName")} />                
                <br/>

                {/* {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>} */}
                Last Name 
                <input type="text" value={ lastName } onInput={(e) => _handleName(e, "lastName")} />
                <br/>
                </section>
                Email
                <input type="email" value={ email? email:"loading..." } title="If you wish to subscribe to the newsletter using a different email, please type it in."/> <br />
                Subscription Type
                <Select
                    closeMenuOnSelect={false}
                    defaultValue={ topicsOptions[0] }
                    isMulti
                    options={ topicsOptions }
                    onChange={ _handleTopics }
                /> <br />
                Subscription Frequency
                <Select
                    classNamePrefix="select"
                    defaultValue={ frequencyOptions[0] }
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    options={ frequencyOptions }
                    onChange={ _handleFrequency }
                /> 
                <input type="submit" value="Subscribe" />
            </form>
            
        </div>
    )
}