import React, { Component } from "react";
import "./components/style/App.css";
import Header from "./components/Header";
import NavBar from "./components/Nav-Bar";
import Articles from "./components/Articles";
import Account from "./components/Account";
import { Router } from "@reach/router";
import Article from "./components/Article";

class App extends Component {
  state = {
    loggedIn:false
  }
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router className="Router">
            <Articles path="articles/:topic" loggedIn = {this.state.loggedIn}/>
            <Article path="articles/:topic/:article_id" />  
        </Router>
        <Account checkUsername = {this.checkUsername} loggedIn = {this.state.loggedIn} logOut = {this.logOut}/>
      </div>
    );
  }

  checkUsername = () => {
    this.setState({ loggedIn:true })
  }

  logOut = () => {
    this.setState({ loggedIn:false })
  }

}

export default App;
