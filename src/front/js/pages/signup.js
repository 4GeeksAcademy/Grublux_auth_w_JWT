import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";







export const Signup = () => {
    const { user, setUser, email, setEmail, password, setPassWord } = useContext(AppContext)

    const navigate = useNavigate();

    const handleSignUp = () => {
        if (email && password) {
            fetch('https://improved-waffle-vggqvgw4jwv36qqq-3001.app.github.dev/api/signup', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password
                    }
                ), // data can be a 'string' or an {object} which comes from somewhere further above in our application
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok)
                        console.log("there was an error", res.statusText)
                    return res.json();
                })
                .then(responseAsJson => {
                    if (responseAsJson == "User already exists!") {
                        alert("User already exists!")
                        console.log('Response:', responseAsJson)
                    }
                    else {
                        setPassWord("")
                        navigate("/success")
                    }
                })
        }

    }




    return (
        <div className="row d-flex justify-content-center text-center mt-5">
            <div className="col-5">
                <h1 className="mb-5">Create Account</h1>
                <input className="me-1" placeholder="enter email"
                    onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <input className="ms-1" placeholder="choose password"
                    onChange={(e) => setPassWord(e.target.value)} value={password}
                />
                <button
                    onClick={() => handleSignUp()}
                >Create Account</button>
            </div>

        </div>
    );
};