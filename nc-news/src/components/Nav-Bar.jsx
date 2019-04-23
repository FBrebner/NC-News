import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import "./style/Nav-Bar.css";


class NavBar extends Component {


  state = {
    topics: [],
    sort_by: "date_created"
  };

  render() {
    console.log(this.state.sort_by)
    const { topics } = this.state;
    return (
      <div className="NavBar">
        <Link to="/articles/all">All Articles</Link>
        {topics.map(topic => (
          <Link key={topic.slug} to={`/articles/${topic.slug}`}>
            {topic.slug}
          </Link>
        ))}
        <select id='sortby' onChange={this.handleChange}>

          <option value = "date_created" > Date Created </option>
          <option value = "comment_count" > Comment Count </option>
          <option value = "votes" > Votes </option>
        </select>
      </div>
    );
  }



  componentDidMount() {
    this.fetchTopics();
  }


handleChange = event => {
  const { value } = event.target
 this.setState({sort_by: value}) //.then(fetchArticles())
}

  fetchTopics = (sortOption) => {
    api.getTopics(sortOption).then(topics => this.setState({ topics }));
  
  };

  sortArticles = () => {
    console.log(document.getElementById('sortby').value)
    api.getTopics().then(topics => this.setState({ topics }));
  };
}

export default NavBar;
