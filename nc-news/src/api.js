import axios from 'axios';
const API_URL = 'https://frasers-nc-news.herokuapp.com/api';

export const getTopics = async () => {
    const { data } = await axios.get(`${API_URL}/topics`);
    return data.topics;
  };

  export const getArticles = async () => {
    const { data } = await axios.get(`${API_URL}/articles`);
    return data.articles;
  };

  export const getArticlesByTopic = async (topic) => {
    const { data } = await axios.get(`${API_URL}/articles?topic=${topic}`);
    return data.articles;
  };