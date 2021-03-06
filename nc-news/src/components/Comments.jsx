import React, { Component } from "react";
import * as api from "../api";
import "./style/Comments.css";
import Votes from "./Votes";

class Comments extends Component {
  state = {
      comments: [],
    comment: "",
    attempt: false
  };
  render() {
    const { comments } = this.state;
    const { comment } = this.state;
    return (
      <div className="Comments">
        {comments ? (
          <div className = 'post'>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="comment">Post a comment</label>
              <textarea
                name="comment"
                onChange={this.handleChange}
                value={comment}
                id="comment"
              />
              <button disabled = {!this.props.loggedIn} type="submit">Post</button>
             {this.state.attempt ? (
              <div className = 'rejection'> <span>Please enter text to post a comment</span> </div>
        ): null
             }
            </form>
            {comments.map(comment => (
              <tr key={comment.comment_id}>
                <td> {comment.body} <br />
                <small> Author: {comment.author} </small> <br />
                <small> Date: {comment.created_at.slice(0, 10)} </small> <br />
                {this.props.username === comment.author ? (
                  <form id={comment.comment_id} onSubmit={this.handleDelete}>
                    <button className = "delete" type="submit">Delete</button>{" "}
                  </form>
                ) : null}
                <Votes
                  comment={comment}
                  loggedIn={this.props.loggedIn}
                  fetchComments={this.fetchComments}
                  check={"comment"}
                /> </td>
              </tr> 
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  handleChange = event => {
    const { value} = event.target;
    this.setState({ comment: value});
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments.length !== this.state.comments.length) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    const { article_id } = this.props;
    api.getComments(article_id).then(comments => this.setState({ comments }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { article_id } = this.props;
    const { comment } = this.state;
    if (comment.length > 0) {
      api.postComment(this.props.username, article_id, comment).then(() => {
        this.fetchComments()
      }).then(() => {
        this.setState({comment: '', attempt:false})
      })
    } else {
      this.setState({attempt: true})
    }
  };

  handleDelete = event => {
    event.preventDefault();
    const id = event.target.id;
    api.deleteComment(id).then(() => {
      this.fetchComments();
    });
  };
}

export default Comments;
