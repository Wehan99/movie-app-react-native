
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';



import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View className="absolute bottom-10 left-2 right-2 bg-gray-900 rounded-full p-3 flex-row justify-around items-center shadow-lg">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        switch (route.name) {
          case 'index':
            iconName = 'home';
            break;
          case 'saved':
            iconName = 'file-tray';
            break;
          case 'search':
            iconName = 'search';
            break;
          case 'profile':
            iconName = 'person';
            break;
          default:
            iconName = 'home';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className={`p-3 items-center rounded-full ${isFocused ? 'bg-gray-800' : ''}`}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#007AFF' : '#ffffff'}
            />
       
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved Movies',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});