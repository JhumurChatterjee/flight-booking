import React from 'react';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import update from 'immutability-helper';

import Flights from '../components/Flights';
import NewFlight from '../components/Flights/NewFlight';
import EditFlight from '../components/Flights/EditFlight';

export default (
  <Switch>
    <Route exact path="/flights" component={Flights}></Route>
    <Route exact path="/flights/new" component={NewFlight} />
    <Route exact path="/flights/edit/:id" component={EditFlight} />
  </Switch>
)
