import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ErrorBoundary from './Components/HOC/errorboundary';

const Edit = lazy(()=> import('./Components/Edit/Edit'));
const Add = lazy(()=> import('./Components/Add/Add'));

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        <Route path="/add"><ErrorBoundary><Add /></ErrorBoundary></Route>
        <Route path="/edit/:id"><Edit /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
