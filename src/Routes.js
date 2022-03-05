import React from "react";

import { Route, Routes as Switch } from "react-router-dom";
import Home from './container/Pages/Home'
import CoinDetails from "./container/Pages/CoinDetails";
export default function Routes() {
  return (
 
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/coindetails/:id' element={<CoinDetails />} />  
      
      </Switch>
 
  );
}

