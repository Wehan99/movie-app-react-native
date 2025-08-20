import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdbApi';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const usePopularMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['popularMovies'],
    queryFn: async () => {
      const response = await tmdbApi.get('/movie/popular');
      return response.data.results;
    },
  });
};