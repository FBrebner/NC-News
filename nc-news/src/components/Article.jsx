import React, { Component } from "react";
import * as api from "../api";
import Votes from "./Votes";
import "./style/Article.css";

class Article extends Component {
  state = {
    article: {
      author: "weegembump",
      body:
        "Jose Mourinho was at The O2 on Sunday night to watch Dominic Thiem in action against Novak Djokovic. Thiem took the first set before Djokovic fought back to claim the victory, but Manchester United's manager was clearly impressed with the Austrian's performance.",
      title: "What does Jose Mourinho's handwriting say about his personality?",
      article_id: 13,
      topic: "football",
      created_at: "2018-04-16T00:00:00.000Z",
      votes: 0,
      comment_count: "6"
    },
    comments: [
      {
        author: "happyamy2016",
        body:
          "Libero explicabo aperiam esse quae. Dolores in ipsum vitae incidunt. Magnam ullam nihil voluptas enim veritatis et nobis architecto.",
        created_at: "2017-08-06T00:00:00.000Z",
        votes: 0,
        comment_id: 20
      },
      {
        author: "grumpy19",
        body:
          "Modi cum quo maxime sunt quia doloribus consequatur recusandae. Quam temporibus est non dolorem. Rerum dolorem nulla sed nam repellendus doloribus non accusantium. Id beatae est et a.",
        created_at: "2017-06-21T00:00:00.000Z",
        votes: 0,
        comment_id: 84
      },
      {
        author: "cooljmessy",
        body:
          "Nihil est deleniti voluptas et soluta. Ea iure error aperiam facere reprehenderit autem corrupti. Reprehenderit labore accusamus esse magni voluptatibus esse minus. Repellat veritatis illum natus. Aut aut dolor omnis est magni sint. Ipsum architecto exercitationem numquam consequatur sit.",
        created_at: "2017-05-08T00:00:00.000Z",
        votes: 0,
        comment_id: 292
      },
      {
        author: "grumpy19",
        body:
          "Beatae labore et voluptatem aut iure. Labore cum tempore eaque cum. Doloribus omnis neque nihil odio ipsum dolore voluptates.",
        created_at: "2016-08-16T00:00:00.000Z",
        votes: 11,
        comment_id: 163
      },
      {
        author: "jessjelly",
        body:
          "Voluptas enim dolores minima repellendus corporis mollitia omnis. Consectetur vitae quaerat possimus repellendus. Cumque maxime nisi itaque aliquid vel non non.",
        created_at: "2016-05-16T00:00:00.000Z",
        votes: 12,
        comment_id: 15
      },
      {
        author: "grumpy19",
        body:
          "Dolor rem saepe voluptas impedit et. Corrupti qui quod commodi. Quos blanditiis placeat.",
        created_at: "2016-02-13T00:00:00.000Z",
        votes: -1,
        comment_id: 247
      }
    ],
    comment: ''
  };
  render() {
    const { comments } = this.state;
    const { comment } = this.state;
    return (
      <div className="Article">
        <h2>{this.state.article.title}</h2>
        <small> Author: {this.state.article.author} </small> <br />
        <small> Date: {this.state.article.created_at.slice(0, 10)} </small>{" "}
        <br />
        {this.state.article.body}
        <br />
        <br />
        <br />
        <form onSubmit = {this.handleSubmit}>
        <label htmlFor="comment">Post a comment</label>
        <textarea
          name="comment"
          onChange={this.handleChange}
          value={comment}
          id="comment"
        />
        <button type="submit">Post</button>
        </form>
        {comments.map(comment => (
          <div key={comment.comment_id}>
             {comment.body}  <br />
            <small> Author: {comment.author} </small> <br />
            <small>
              {" "}
              Date: {comment.created_at.slice(0, 10)}{" "}
            </small>{" "}
            <br />
            {this.props.username === comment.author ? (
            <form id={comment.comment_id} onSubmit = {this.handleDelete}>
              <button type="submit" >Delete</button>{" "}
            </form>
              ) : null}
            <Votes comment={comment} loggedIn = {this.props.loggedIn} fetchComments = {this.fetchComments} check = {'comment'}/>
          </div>
        ))}
      </div>
    );
  }

  handleChange = event => {
    const { value} = event.target;
    this.setState({ comment: value });
  };

  handleSubmit = event => {
    event.preventDefault()
    const { article_id } = this.props;
    const { comment } = this.state
    if (comment.length>0) {
    api.postComment(this.props.username, article_id, comment)
    .then(() => {this.fetchComments()})
    } else {

    }
  }

  handleDelete = event => {
    event.preventDefault()
    const id = event.target.id;
    api.deleteComment(id)
    .then(() => {this.fetchComments()})
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments.length!== this.state.comments.length) {
      console.log('here')
      this.fetchComments()
    }
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api.getArticle(article_id).then(article => this.setState({ article }));
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api.getComments(article_id).then(comments => this.setState({ comments }));
  };
}

export default Article;
