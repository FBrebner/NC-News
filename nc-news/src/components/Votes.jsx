import React, { Component } from "react";
import * as api from "../api";

class Votes extends Component {
  state = {
    check: this.props.check,
    article: this.props.article,
    comment: this.props.comment,
    votes: this.props[this.props.check].votes,
    changedVote: 0
  };
  render() {
 const {check} = this.state
    return (
      <div>
        Votes: {this.state.votes} <br />
        {this.props.loggedIn ? (
          <div>
            {" "}
            <form id={this.props[check].article_id || this.props.comment.comment_id} onSubmit={(event) => {if (check==='article') {this.changeArticleVote(event, 1)} else if (check==='comment') {this.changeCommentVote(event, 1)}}}>
              {" "}
              <button type="submit" disabled = {this.state.changedVote === 1}>+1</button>
            </form>{" "}
            <form id={this.props[check].article_id || this.props.comment.comment_id} onSubmit={(event) => {if (check==='article') {this.changeArticleVote(event, -1)} else if (check==='comment') {this.changeCommentVote(event, -1)}}}>
              {" "}
              <button type="submit" disabled = {this.state.changedVote === -1}>-1</button>{" "}
            </form>{" "}
          </div>
        ) : null}
      </div>
    );
  }

  changeArticleVote = (event, inc) => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id)
      api.patchArticleVote(id, inc)
      this.setState(prevState => {
          return {
            votes: prevState.votes + inc,
            changedVote: this.state.changedVote + inc
          };
        });
  };

  changeCommentVote = (event, inc) => {
    event.preventDefault();
    const id = event.target.id;
      api.patchCommentVote(id, inc)
      this.setState(prevState => {
          return {
            votes: prevState.votes + inc
          };
        });
  };
}

export default Votes;
