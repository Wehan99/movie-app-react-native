import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdbApi';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const useSearchMovies = (query: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ['searchMovies', query],
    queryFn: async () => {
      console.log('Fetching search results for query:', query); // Debug log
      if (!query.trim()) {
        console.log('Empty query, returning empty array');
        return [];
      }
      try {
        const response = await tmdbApi.get('/search/movie', {
          params: {
            query: query.trim(),
          },
        });
  
        if (!response.data.results) {
          console.warn('No results in response:', response.data);
          return [];
        }
        return response.data.results;
      } catch (error) {
        if (error instanceof Error) {
          console.error('API error:', error.message);
          throw new Error(`Failed to fetch movies: ${error.message}`);
        } else {
          console.error('API error:', error);
          throw new Error('Failed to fetch movies: Unknown error');
        }
      }
    },
    enabled: !!query.trim(), // Only fetch if query is non-empty
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};