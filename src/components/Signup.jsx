import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Signup() {

    const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const _signInWithEmailAndPassword = async (event) => {
    event.preventDefault();

    // const auth = getAuth();
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        setErrorMsg("Please enter a valid email address");
        return;
      }

    if (password !== passwordConfirmation) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully:", user);
     navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const _handleEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setErrorMsg("");
  };

  const _handlePassword = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setErrorMsg("");
  };

  const _handlePasswordConfirmation = (event) => {
    const inputPasswordConfirmation = event.target.value;
    setPasswordConfirmation(inputPasswordConfirmation);
    setErrorMsg("");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={_signInWithEmailAndPassword}>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onInput={_handleEmail}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onInput={_handlePassword}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirmation}
          onInput={_handlePasswordConfirmation}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}
