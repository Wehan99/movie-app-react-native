import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import * as Font from 'expo-font';
import { Figtree_400Regular, Figtree_700Bold } from '@expo-google-fonts/figtree';
import MovieList from '@/components/MovieList';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import MovieCard from '@/components/MovieCard';


export default function HomePage() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const { data: movies, isLoading, error } = usePopularMovies();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Figtree_Regular: Figtree_400Regular,
        Figtree_Bold: Figtree_700Bold,
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or a loading spinner
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appTitle}>Movieract</Text>

    
          <View style={styles.movieSection}>
            <Text style={styles.sectionTitle}>Popular Movies</Text>
           <MovieList
            data={movies || []}
            isLoading={isLoading}
            error={error}
            renderItem={(item) => <MovieCard movie={item} />}
            emptyText="No popular movies available."
          />
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark theme background
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
  },
  appTitle: {
    fontFamily: 'Figtree_Bold',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  movieSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Figtree_Bold',
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
});