import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import NavBar from "./layouts/NavBar";
import HInfo from "./pages/HInfo";
import DInfo from "./pages/DInfo";
import HStream from "./pages/HStream";
import DStream from "./pages/DStream";
import { authentication, signout } from "../services/AuthService";
import SignIn from "./pages/SignIn";
import { getCookie, removeCookie, setCookie } from "../services/UtilService";

const Markup = (props) => {

    const [isLogged, setLogged] = useState(authentication);

    // useEffect(() => {
    //     // signout();
    //     // removeCookie('isLogged');
    //     // setCookie('isLogged', true);
    //     console.log('authentication');
    // }, []);

    const routes = [
        { url: "", element: <Home /> },
        { url: "search/:id/:pageno", element: <Search /> },
        { url: "hinfo/:type/:id/:pageno", element: <HInfo /> },
        { url: "dinfo/:type/:id/:pageno", element: <DInfo /> },
        { url: "hstream/:episodeId/:type/:id", element: <HStream /> },
        { url: "dstream/:episodeId/:type/:id", element: <DStream /> },
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