import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './jsx/pages/Home';
import Index from "./jsx";

function App() {
  const [isLogged, setLogged] = useState(true);

  let routes = (
    <Routes>
      <Route exact={true} path='/login' element={<Home />} />
    </Routes>
  );

  return (
    <Router basename="/">
      {isLogged ? <Index /> : routes}
    </Router>
  );
}

export default App;
