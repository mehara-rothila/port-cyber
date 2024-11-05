// App.js
import React from 'react';
import Portfolio from './components/Portfolio';
import DotCursor from './components/DotCursor';
import './App.css';

function App() {
  return (
    <div className="App relative min-h-screen theme-transition">
      <DotCursor />
      <Portfolio />
    </div>
  );
}

export default App;