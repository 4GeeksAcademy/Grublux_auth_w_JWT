import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Link, useNavigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Landing } from "./pages/landing";
import { Signup } from "./pages/signup";
import { Success } from "./pages/success";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

export const AppContext = React.createContext(null);

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";



    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const [user, setUser] = useState({})

    const [email, setEmail] = useState("")

    const [password, setPassWord] = useState("")

    const [error, setError] = useState("")

    return (
        <div>
            <AppContext.Provider value={{ user, setUser, email, setEmail, password, setPassWord, error, setError }}>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        {/* <Navbar /> */}
                        <Routes>
                            <Route element={<Landing />} path="/" />
                            <Route element={<Home />} path="/home" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<Success />} path="/success" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
};

export default injectContext(Layout);
