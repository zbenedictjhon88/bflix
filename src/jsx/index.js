import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from '../jsx/layouts/Header';
import SideBar from '../jsx/layouts/SideBar';
import Footer from '../jsx/layouts/Footer';

import Home from "./pages/Home";
import Search from "./pages/Search";
import Info from "./pages/Info";
import Stream from "./pages/Stream";
import NavBar from "./layouts/NavBar";
import HInfo from "./pages/HInfo";
import DInfo from "./pages/DInfo";
import HStream from "./pages/HStream";
import DStream from "./pages/DStream";

const Markup = (props) => {

    const routes = [
        { url: "", element: <Home /> },
        { url: "search/:id", element: <Search /> },
        { url: "hinfo/:type/:id", element: <HInfo /> },
        { url: "dinfo/:type/:id", element: <DInfo /> },
        { url: "hstream/:episodeId/:type/:id", element: <HStream /> },
        { url: "dstream/:episodeId/:type/:id", element: <DStream /> },
        // { url: "error-404", component: Error404 },
    ];

    return (
        <>
            <NavBar />
            <div className='main'>
                <Routes>
                    {routes.map((data, i) => (
                        <Route
                            key={i}
                            // exact={true}
                            path={`/${data.url}`}
                            element={data.element}
                        />
                    ))}
                </Routes>
            </div>
        </>
    );
}

export default Markup;