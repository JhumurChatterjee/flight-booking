import React from 'react';
import { Route, Switch } from "react-router-dom";

import Flights from '../components/Flights';
import NewFlight from '../components/Flights/NewFlight';
import EditFlight from '../components/Flights/EditFlight';

export default (
  <Switch>
    <Route exact path="/admin/flights" component={Flights}></Route>
    <Route exact path="/admin/flights/new" component={NewFlight} />
    <Route exact path="/admin/flights/edit/:id" component={EditFlight} />
  </Switch>
)
