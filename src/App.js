import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import {Switch, Route} from 'react-router-dom';
import CompanyPage from "./pages/company/company.component";
import Header from "./components/header/header.component";
function App() {
  return (
      <div>
          <Header/>
          <Switch>
              <Route exact = {true} path = {'/'} component = {HomePage}/>
              <Route exact = {true} path = {'/company'} component = {CompanyPage}/>
          </Switch>
      </div>
  );
}

export default App;
