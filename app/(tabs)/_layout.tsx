import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: '#fff' },
      tabBarActiveTintColor: '#007AFF',
    }}>
      <Tabs.Screen name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} />
      <Tabs.Screen name="saved"
        options={{
          title: 'Saved Movies',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="file-tray" size={size} color={color} />
          ),
        }} />
      <Tabs.Screen name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }} />
      <Tabs.Screen name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})