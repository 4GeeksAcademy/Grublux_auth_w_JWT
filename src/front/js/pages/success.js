import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";







export const Success = () => {
    const { user, setUser, email, setEmail, password, setPassWord } = useContext(AppContext)

    const navigate = useNavigate();

    return (
        <div className="row d-flex justify-content-center text-center mt-5">
            <div className="col-5">
                <h3 className="mb-5">Account Successfully Created</h3>
                <p className="text-secondary">
                    <span className="toLogin p-3 fs-5"
                        onClick={() => navigate("/")}
                    >Proceed to Login</span>
                </p>
            </div>

        </div>
    );
};