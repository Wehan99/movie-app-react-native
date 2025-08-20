import Axios from 'axios';
import Constants from 'expo-constants';

const tmdbApi = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY ,

  },
});

export default tmdbApi;