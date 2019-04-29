import React, { Component } from "react";
import "./components/style/App.css";
import Header from "./components/Header";
import NavBar from "./components/Nav-Bar";
import Articles from "./components/Articles";
import Account from "./components/Account";
import Welcome from "./components/Welcome";
import { Router } from "@reach/router";
import Article from "./components/Article";
import Error from "./components/Error";



class App extends Component {
  state = {
    loggedIn:false,
    username:''
  }
  render() {
    return (
      
      <div className="App">
      <style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
</style>
        <Header />
        <NavBar />
        <Router primary={false} className="Router">
            <Welcome path="/"/>
            <Articles path="articles/:topic" loggedIn = {this.state.loggedIn}/>
            <Article path="articles/:topic/:article_id" username = {this.state.username} loggedIn = {this.state.loggedIn}/>  
            <Error path="/error" default/>
        </Router>
        <Account checkUsername = {this.checkUsername} loggedIn = {this.state.loggedIn} logOut = {this.logOut}/>
      </div>
    );
  }

  checkUsername = (user) => {
    this.setState({ loggedIn:true, username: user.username })
  }

  logOut = () => {
    this.setState({ loggedIn:false })
  }

}

export default App;
