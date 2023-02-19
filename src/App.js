import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Index from "./jsx";
import Footer from "./jsx/layouts/Footer";
import NavBar from "./jsx/layouts/NavBar";
import About from "./jsx/pages/About";
import DInfo from "./jsx/pages/DInfo";
import DStream from "./jsx/pages/DStream";
import HInfo from "./jsx/pages/HInfo";
import Home from "./jsx/pages/Home";
import HStream from "./jsx/pages/HStream";
import Privacy from "./jsx/pages/Privacy";
import Search from "./jsx/pages/Search";
import SignIn from "./jsx/pages/SignIn";
import SignUp from "./jsx/pages/SignUp";
import Terms from "./jsx/pages/Terms";
import { authentication } from "./services/AuthService";

function App() {
  const [isLogged, setLogged] = useState(false);

  // useEffect(() => {
  //   setLogged(authentication);
  //   if (isLogged) {
  //     window.location.replace('/');
  //   }
  // }, [authentication]);

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
    { url: "sign-in", element: <SignIn /> },
    { url: "sign-up", element: <SignUp /> }
  ];

  return (
    <Router basename="/">
      <NavBar />
      <Routes>
        {routes.map((data, i) => (
          <Route
            key={i}
            exact={true}
            path={`/${data.url}`}
            element={data.element}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
