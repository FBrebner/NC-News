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
    loggedIn:false,
    username:''
  }
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router className="Router">
            <Articles path="articles/:topic" loggedIn = {this.state.loggedIn}/>
            <Article path="articles/:topic/:article_id" username = {this.state.username} loggedIn = {this.state.loggedIn}/>  
        </Router>
        <Account checkUsername = {this.checkUsername} loggedIn = {this.state.loggedIn} logOut = {this.logOut}/>
      </div>
    );
  }

  checkUsername = (username) => {
    this.setState({ loggedIn:true, username: username })

  }

  logOut = () => {
    this.setState({ loggedIn:false, username: '' })
  }

}

export default App;
