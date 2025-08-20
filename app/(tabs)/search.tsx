import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import * as Font from 'expo-font';
import { Figtree_400Regular, Figtree_700Bold } from '@expo-google-fonts/figtree';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import MovieList from '../../components/MovieList'; // Adjust path
import MovieCard from '../../components/MovieCard'; // Adjust path
import Constants from 'expo-constants';

export default function SearchPage() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const apiKey = Constants.expoConfig?.extra?.tmdbApiKey;
  useEffect(() => {
    if (!apiKey) {
      console.warn('TMDB API key is missing. Check app.json and .env.');
    }
  }, [apiKey]);

  const { data: movies, isLoading, error } = useSearchMovies(searchQuery);

  if (!fontLoaded) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
        <MovieList
          data={movies || []}
          isLoading={isLoading}
          error={error}
          renderItem={(item) => <MovieCard movie={item} />}
          emptyText="No movies found. Try a different search!"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    fontFamily: 'Figtree_Regular',
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    fontFamily: 'Figtree_Regular',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontFamily: 'Figtree_Regular',
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});