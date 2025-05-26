import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen'; // Para calendario o lista
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';


import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Events') iconName = 'calendar-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d46bcf',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={MainMenuScreen} />
      <Tab.Screen name="Events" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      

    </Tab.Navigator>
  );
}