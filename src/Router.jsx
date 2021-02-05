import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Company from './pages/Company';
import Crew from './pages/Crew';
import Rockets from './pages/Rockets';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Company} />
        <Route path="/crew" component={Crew} />
        <Route path="/rockets" component={Rockets} />
      </Switch>
    </BrowserRouter>
  );
}
