import React, { Component } from "react";
import * as api from "../api";
import "./style/Account.css";

class Account extends Component {
    state = {
        username: 'jessjelly',
        attempt: false
    }
    render() {
        const { username} = this.state
         if (this.props.loggedIn) {
             return (
<div className="Account">
Welcome {username}
<form onSubmit={this.handleLogOut}>
    <button type="submit">Log-out</button>
</form>
</div>
             )
         } else {
         return (
    <div className="Account">
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          onChange={this.handleChange}
          value={username}
          id="username"
        />
        <button type="submit">Log-in</button>
      </form>
      {this.state.attempt ? (
          <div> Incorrect username, please try again</div>
           ) : null}
    </div>
  );
}
  }

  handleChange = event => {
    const { value} = event.target;
    this.setState({ username: value });
  };

  handleSubmit = event => {
    event.preventDefault()
    const { username } = this.state
    api.getUser(username)
    .then(user => this.props.checkUsername(user))
    .catch(() => this.setState({attempt : true}));
  }
  handleLogOut = event => {
    event.preventDefault()
    this.props.logOut()
    this.setState({username : 'jessjelly', attempt: false})
  }
};

export default Account;
