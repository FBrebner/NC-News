import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import "./style/Nav-Bar.css";


class NavBar extends Component {


  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    return (
      <div className="NavBar">
        <Link to="/articles/all">All Articles</Link>
        {topics.map(topic => (
          <Link key={topic.slug} to={`/articles/${topic.slug}`}>
            {topic.slug}
          </Link>
        ))}

      </div>
    );
  }



  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = (sortOption) => {
    api.getTopics(sortOption).then(topics => this.setState({ topics }));
  
  };
}

export default NavBar;
