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

const Markup = (props) => {

    const routes = [
        { url: "", element: <Home /> },
        { url: "search/:id", element: <Search /> },
        // { url: "?search=:id", element: <Search /> },
        { url: "info/:type/:id", element: <Info /> },
        { url: "stream/:episodeId/:type/:id", element: <Stream /> },
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