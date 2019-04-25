import React, { Component } from "react";
import * as api from "../api";

class Votes extends Component {
  state = {
    article: this.props,
    votes: this.props.article.votes
  };
  render() {
     
    console.log(this.state.votes);
    return (
      <div>
        Votes: {this.state.votes} <br />
        {this.props.loggedIn ? (
          <div>
            {" "}
            <form id={this.props.article.article_id} onSubmit={this.incVote}>
              {" "}
              <button type="submit">+1</button>
            </form>{" "}
            <form id={this.props.article.article_id} onSubmit={this.decVote}>
              {" "}
              <button type="submit">-1</button>{" "}
            </form>{" "}
          </div>
        ) : null}
      </div>
    );
  }

  incVote = (event) => {
    event.preventDefault();
    const article_id = event.target.id;
    api.upVote(article_id)
        this.setState(prevState => {
            return {
              votes: prevState.votes + 1
            };
          });
  };

  decVote = event => {
    event.preventDefault();
    const article_id = event.target.id;
    api.downVote(article_id)
        this.setState(prevState => {
            return {
              votes: prevState.votes - 1
            };
          });
  };
}

export default Votes;
