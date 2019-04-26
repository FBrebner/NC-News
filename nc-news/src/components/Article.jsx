import React, { Component } from "react";
import * as api from "../api";
import "./style/Article.css";
import Comments from "./Comments";
import { navigate } from '@reach/router'

class Article extends Component {
  state = {
  };
  render() {
    const {article} = this.state
    return (
    
      <div className="Article">
        {article ? (
          <div>
        <h2>{this.state.article.title}</h2>
        <small> Author: {this.state.article.author} </small> <br />
        <small> Date: {this.state.article.created_at.slice(0, 10)} </small>
        <br />
        {this.state.article.body}
        <br />
        <br />
        <br />
        <Comments article_id={this.state.article.article_id} loggedIn = {this.props.loggedIn} username = {this.props.username}/>
        </div>
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle()
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api.getArticle(article_id).then(article => this.setState({ article }))
    .catch(err => {
      navigate('/error', {replace: true});
    });
  };
}

export default Article;
