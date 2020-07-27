import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Edit = lazy(()=> import('./Components/Edit/Edit'));
const Add = lazy(()=> import('./Components/Add/Add'));

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        <Route path="/add"><Add /></Route>
        <Route path="/edit/:id"><Edit /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
