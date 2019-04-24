import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import "./style/Articles.css";

class Articles extends Component {
  state = {
    articles: [],
    sort_by: "date_created"
  };
  render() {
    const { articles } = this.state;
    return (
      <div className="Articles">
        <select id="sortby" onChange={this.handleChange}>
          <option value="date_created"> Date Created </option>
          <option value="comment_count"> Comment Count </option>
          <option value="votes"> Votes </option>
        </select>
        <h2> </h2>
        {articles.map(article => (
          <div key={article.article_id}>
          <Link  to={`/articles/${article.topic}/${article.article_id}`}>
            <h3> {article.title} </h3> 
            </Link>
            Author: {article.author} <br />
            Date: {article.created_at.slice(0, 10)} <br />
            Votes: {article.votes} <br />
            { this.props.loggedIn ? <div> <form id={article.article_id} onSubmit={this.incVote}> <button type="submit" >+1</button></form> <button type="submit">-1</button> </div>: null }
            Comment Count: {article.comment_count}
         </div>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic || prevState.sort_by!== this.state.sort_by) {
      this.fetchArticles();
    }
  }

  handleChange = event => {
    const { value } = event.target
   this.setState({sort_by: value})
  }

  fetchArticles = () => {
    const { topic } = this.props;
    if (topic === "all") {
      api.getArticles(this.state.sort_by).then(articles => this.setState({ articles }));
    } else {
      api
        .getArticlesByTopic(topic, this.state.sort_by)
        .then(articles => this.setState({ articles }));
    }
  };

  incVote = (event) => {
  event.preventDefault()
  const article_id = event.target.id
console.log(article_id)
  }

}

export default Articles;
