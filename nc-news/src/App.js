import React, { Component } from "react";
import "./components/style/App.css";
import Header from "./components/Header";
import NavBar from "./components/Nav-Bar";
import Articles from "./components/Articles";
import Account from "./components/Account";
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router className="Router">
            <Articles path="articles/:topic" /> 
        </Router>
        <Account />
      </div>
    );
  }
}

export default App;
