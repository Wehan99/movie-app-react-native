import { Stack } from 'expo-router';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="movie/[id]"
            options={{
              headerShown: true,
              title: 'Movie Details',
            }}
          />
          <Stack.Screen
            name="(tabs)/saved"
            options={{
              title: 'Saved Movies',
            }}
          />
          <Stack.Screen
            name="(tabs)/profile"
            options={{
              title: 'Profile',
            }}
          />
        </Stack>
        <StatusBar style="light" backgroundColor="#1a1a1a" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Match your dark theme
  },
});