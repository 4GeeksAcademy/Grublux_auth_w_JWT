import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";







export const Landing = () => {
    const { user, setUser, email, setEmail, password, setPassWord, error, setError } = useContext(AppContext)

    const navigate = useNavigate();

    const handleLogin = () => {
        if (email && password) {
            fetch('https://improved-waffle-vggqvgw4jwv36qqq-3001.app.github.dev/token', {
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
                    if (responseAsJson.msg == "successfully authenticated") {
                        console.log('Response:', responseAsJson)
                        const token = responseAsJson.token
                        const usersEmail = responseAsJson.email
                        const usersId = responseAsJson.id
                        sessionStorage.setItem("jwt-token", token)
                        console.log(sessionStorage.getItem("jwt-token"))
                        setUser({
                            "id": usersId,
                            "email": usersEmail
                        })
                    }
                    else {
                        setError(responseAsJson)
                        console.log(responseAsJson.msg)
                    }
                })
                .then(
                    navigate("/home")
                )
        }

    }




    return (
        <div className="row d-flex justify-content-center text-center mt-5">
            <div className="col-5">
                <h1 className="mb-5">Welcome!</h1>
                <input className="me-1" placeholder="email" type="text"
                    onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <input className="ms-1" placeholder="password" type="text"
                    onChange={(e) => setPassWord(e.target.value)} value={password}
                />
                <button
                    onClick={() => handleLogin()}
                >Login</button>
                <p className="mt-5 text-secondary">Need an account? <span className="mySignUp p-1 mx-2"
                    onClick={() => navigate("/signup")}
                > signup here</span></p>
            </div>

        </div>
    );
};