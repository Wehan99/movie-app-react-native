import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

// Sample saved movies data
const INITIAL_SAVED = [
  { id: "1", title: "Inception", poster: "https://m.media-amazon.com/images/I/51s8+fP0XlL._AC_.jpg" },
  { id: "2", title: "Interstellar", poster: "https://m.media-amazon.com/images/I/81bGdJffK9L._AC_SL1500_.jpg" },
  { id: "3", title: "The Dark Knight", poster: "https://m.media-amazon.com/images/I/71pXgYxN9WL._AC_SY679_.jpg" },
];

export default function SavedMoviesPage() {
  const [savedMovies, setSavedMovies] = useState(INITIAL_SAVED);

  const removeMovie = (id) => {
    setSavedMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const renderMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeMovie(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Saved Movies</Text>
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id}
          renderItem={renderMovie}
          ListEmptyComponent={
            <Text style={styles.noResults}>No saved movies yet</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  movieCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f0f4ff",
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 80,
    height: 120,
  },
  movieInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  noResults: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});