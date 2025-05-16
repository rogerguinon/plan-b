import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen';
// import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';
// import EventListScreen from '../screens/EventListScreen/EventListScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="MainMenu">
      <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Plan B' }} />
    </Stack.Navigator>
  );
}

// This code defines a stack navigator using React Navigation.