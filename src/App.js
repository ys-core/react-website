import React from 'react';

import Profile from './components/profile'
import Body from  './components/body'
import Advertisement from './components/advertisement'

import './css/App.css';

function App() {
  return (
    <div className="App">
       <Body />
       <Profile />
       <Advertisement />
    </div>
  );
}

export default App;

