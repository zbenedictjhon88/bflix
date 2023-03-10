import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import HInfo from "./pages/HInfo";
import DInfo from "./pages/DInfo";
import HStream from "./pages/HStream";
import DStream from "./pages/DStream";
import { authentication, signout } from "../services/AuthService";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { getCookie, removeCookie, setCookie } from "../services/UtilService";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Ad from "./components/Ad";

const Markup = (props) => {

    const [isLogged, setLogged] = useState(authentication);

    const routes = [
        { url: "", element: <Home /> },
        { url: "search/:id/:pageno", element: <Search /> },
        { url: "hinfo/:type/:id/:pageno", element: <HInfo /> },
        { url: "dinfo/:type/:id/:pageno", element: <DInfo /> },
        { url: "hstream/:episodeId/:type/:id", element: <HStream /> },
        { url: "dstream/:episodeId/:type/:id", element: <DStream /> },
        { url: "about", element: <About /> },
        { url: "user-agreement", element: <Terms /> },
        { url: "privacy-policy", element: <Privacy /> },
        { url: "guest", element: <SignIn guest={true} /> },
        { url: "sign-up", element: <SignUp /> }
    ];

    let authenticated = (
        <>
            <NavBar />
            <div className='main'>
                <Routes>
                    {routes.map((data, i) => (
                        <Route
                            key={i}
                            exact={true}
                            path={`/${data.url}`}
                            element={data.element}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </div>
            <Footer />
            {/* <Ad /> */}
        </>
    );

    return (
        <>
            {authenticated}
            {/* {isLogged ? 'true' : 'false'} */}
            {/* {isLogged ? authenticated : unauthenticate} */}
        </>
    );
}

export default Markup;