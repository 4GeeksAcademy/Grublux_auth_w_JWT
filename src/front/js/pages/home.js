import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { user, setUser, email, setEmail, password, setPassWord, error, setError } = useContext(AppContext)

	const navigate = useNavigate();

	const userToken = sessionStorage.getItem("jwt-token")
	console.log("The user token is:")
	console.log(userToken)

	useEffect(() => {
		// This will run every time the component re-renders
		if (userToken) {
			fetch('https://improved-waffle-vggqvgw4jwv36qqq-3001.app.github.dev/auth/user', {
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					'Authorization': 'Bearer ' + userToken // ⬅⬅⬅ authorization token
				}
			})
				.then(response => {
					// Read the response as JSON
					return response.json();
				})
				.then(responseAsJson => {
					if (responseAsJson.msg == "successfully authenticated") {
						setUser(responseAsJson);
						console.log(responseAsJson)
						setError("")
						return user
					}
					else {
						setError(responseAsJson)
					}
					// Do stuff with the JSONified response            
				})
			// This will run only if some_condition is true
		}
	}); // <------ PLEASE NOTICE THE EMPTY ARRAY IS GONE!




	if (user.id) {
		var splitName = user.username.split("@")
		var cleanName = splitName[0]
	}

	const handleLogout = () => {
		setUser("")
		sessionStorage.setItem("jwt-token", null)
		setEmail("")
		setPassWord("")
		navigate("/")
	}

	const handleRedirect = () => {
		setUser("")
		setError("")
		sessionStorage.setItem("jwt-token", null)
		setEmail("")
		setPassWord("")
		navigate("/")
	}




	return (
		<div className="text-center mt-5">{
			<>{
				user.id ? <div>
					<h1 className="text-capitalize mb-5">Hello {cleanName} !</h1>
					<img src="https://cdn.pixabay.com/photo/2023/03/11/20/24/animal-7845217_1280.jpg"
						style={{ width: "420px" }}></img>
					<p className="text-secondary mt-5"><span className="toLogin p-3"
						onClick={() => handleLogout()}
					>Log Out</span></p>
				</div> :
					error ?
						<div>
							<h1 className="text-capitalize mb-5" style={{}}>You must create an account!</h1>
							<img src="https://cdn.pixabay.com/photo/2016/05/15/04/13/area-closed-1393118_1280.jpg"
								style={{ width: "420px" }}></img>
							<p className="text-secondary mt-5"><span className="toLogin p-3"
								onClick={() => {
									handleRedirect();
								}
								}
							>Go To Login</span></p>
						</div> :
						<div><i className="fa-solid fa-cog fa-spin fs-1"></i></div>

			}



			</>
		}

		</div>
	);
};
