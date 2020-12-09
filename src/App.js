import React from "react";
import Header from './Header';
import Middle from './Middle';
import Left from './Left';
//import './App.css';

function App() {
  return (
    <div>
      <header><Header /></header>
      <div><Left /></div>
      <div><Middle /></div>
    </div>
  );
}

export default App;
