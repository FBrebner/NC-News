import axios from 'axios';
const API_URL = 'https://frasers-nc-news.herokuapp.com/api';

export const getTopics = async () => {
    const { data } = await axios.get(`${API_URL}/topics`);
    return data.topics;
  };

  export const getArticles = async (sortBy) => {
    const { data } = await axios.get(`${API_URL}/articles?sort_by=${sortBy}`);
    return data.articles;
  };

  export const getArticlesByTopic = async (topic, sortBy) => {
    const { data } = await axios.get(`${API_URL}/articles?topic=${topic}&sort_by=${sortBy}`);
    return data.articles;
  };

  export const getArticle = async (article_id) => {
    const { data } = await axios.get(`${API_URL}/articles/${article_id}`);
    return data.article;
  };

  export const getComments = async (article_id) => {
    const { data } = await axios.get(`${API_URL}/articles/${article_id}/comments`);
    return data.comments;
  };

  export const getUser = async (username) => {
    const { data } = await axios.get(`${API_URL}/users/${username}`);
    console.log(data.user)
    return data.user;
  };