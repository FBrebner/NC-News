import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from '../api';
import "./style/Articles.css";

class Articles extends Component {
    state = {
        articles: [],
        sort_by: 'created_at'
    }
    render(){
        const { articles } = this.state;
    return (
        <div className="Articles">
            {articles.map(article => (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
           <h3> {article.title}  </h3> Author: {article.author} <br/> 
           Date :{article.created_at.slice(0, 10)} <br/>
           Votes: {article.votes}
          </Link>
        ))}
        </div>
    );
};

componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { topic } = this.props
     if (topic==="all") {
     api.getArticles().then(articles => this.setState({ articles }));
  } else {
   api.getArticlesByTopic(topic).then(articles => this.setState({ articles }))
 }
  };

};

export default Articles;
