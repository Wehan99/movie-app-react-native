import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

interface MovieListProps {
  data: any[];
  isLoading: boolean;
  error: Error | null;
  renderItem: (item: any) => React.ReactElement;
  emptyText: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, isLoading, error, renderItem, emptyText }) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      estimatedItemSize={180}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        data.length === 0 && !isLoading && !error ? (
          <Text style={styles.emptyText}>{emptyText}</Text>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MovieList;