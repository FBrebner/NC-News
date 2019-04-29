import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import "./style/Articles.css";
import Votes from "./Votes";
import { navigate } from '@reach/router'

class Articles extends Component {
  state = {
    articles: [],
    sort_by: "date_created",
    order: 'asc'
  };
  render() {
    const { articles } = this.state;
    return (
      <div className="Articles">
        <select id="sortby" onChange={this.handleChange}>
          <option value="date_created" > Date Created</option>
          <option value="comment_count" > Comment Count </option>
          <option value="votes" > Votes </option>
        </select>
        <select id="order" onChange={this.handleOrderChange}>
          <option value="asc" > Ascending</option>
          <option value="desc" > Descending </option>
        </select>
        {articles.map(article => (
          <span key={article.article_id}>
          <Link  to={`/articles/${article.topic}/${article.article_id}`}>
            <h3> {article.title} </h3> 
            </Link>
            Author: {article.author} <br />
            Date: {article.created_at.slice(0, 10)} <br />
            <Votes article={article} loggedIn = {this.props.loggedIn} fetchArticles = {this.fetchArticles} check = {'article'}/>
            Comment Count: {article.comment_count}
         </span>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic || prevState.sort_by!== this.state.sort_by || prevState.order!== this.state.order) {
      this.fetchArticles();
    }
  }

  handleChange = event => {
    const { value} = event.target
   this.setState({sort_by: value})
  }

  handleOrderChange = event => {
    const {value } = event.target
    console.log(value)
   this.setState({order: value})
  }

  fetchArticles = () => {
    const { topic } = this.props;
    const {sort_by, order} = this.state
    if (topic === "all") {
      api.getArticles(sort_by, order).then(articles => this.setState({ articles }))
      .catch(err => {
        navigate('/error', {replace: true});
      });
    } else {
      api
        .getArticlesByTopic(topic, sort_by, order)
        .then(articles => this.setState({ articles }))
    }
    
  };



}

export default Articles;
