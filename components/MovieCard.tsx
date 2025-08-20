import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';
import { Figtree_400Regular, Figtree_700Bold } from '@expo-google-fonts/figtree';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          Figtree_Regular: Figtree_400Regular,
          Figtree_Bold: Figtree_700Bold,
        });
        setFontLoaded(true);
      } catch (error) {
        setFontLoaded(true); // Fallback to render without fonts
      }
    }
    loadFont();
  }, []);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        contentFit="cover"
        transition={100}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview}
        </Text>
        <Text style={styles.releaseDate}>Release: {movie.release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Figtree_Bold',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  overview: {
    fontFamily: 'Figtree_Regular',
    color: '#cccccc',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 5,
  },
  releaseDate: {
    fontFamily: 'Figtree_Regular',
    color: '#999999',
    fontSize: 12,
  },
});

export default MovieCard;