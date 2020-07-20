import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import Edit from './Components/Edit/Edit';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route path="/add"><Add /></Route>
    <Route path="/edit/:id"><Edit /></Route>
    <Route path="/"><Home /></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
