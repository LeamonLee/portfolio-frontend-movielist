import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/discover/movie',
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: false,
    include_video: false,
  }
});