import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Index from "./jsx";
import About from "./jsx/pages/About";
import Privacy from "./jsx/pages/Privacy";
import SignIn from "./jsx/pages/SignIn";
import SignUp from "./jsx/pages/SignUp";
import Terms from "./jsx/pages/Terms";
import { authentication } from "./services/AuthService";

function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(authentication);
    if (isLogged) {
      window.location.replace('/');
    }
  }, [authentication]);

  let routes = (
    <Routes>
      <Route exact={true} path='/sign-in' element={<SignIn />} />
      <Route exact={true} path='/sign-up' element={<SignUp />} />
      <Route exact={true} path='/about' element={<About />} />
      <Route exact={true} path='/user-agreement' element={<Terms />} />
      <Route exact={true} path='/privacy-policy' element={<Privacy />} />
      <Route
        path="*"
        element={<Navigate to="/sign-in" replace />}
      />
    </Routes>
  );

  return (
    <Router basename="/">
      {isLogged ? <Index /> : routes}
    </Router>
  );
}

export default App;
