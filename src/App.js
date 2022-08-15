import './App.css';
import React, { Fragment } from 'react';
import Account from './components/TopHeader/Account.jsx';
import SideBar from './components/Navigation/SideBar';
import Header from './components/Navigation/Header';

function App() {
  return (
    <Fragment>
      <SideBar />
      <Account />
      <Header />
    </Fragment>
  );
}

export default App;
