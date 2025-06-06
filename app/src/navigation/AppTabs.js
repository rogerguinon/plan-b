import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen'; // Para calendario o lista
import UserInfoScreen from '../screens/UserInfoScreen/UserInfoScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') iconName = 'home-outline';
          else if (route.name === 'Eventos') iconName = 'calendar-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d46bcf',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={MainMenuScreen} options={{headerShown:true}}/>
      <Tab.Screen name="Eventos" component={CalendarScreen} options={{headerShown:true}}/>
      <Tab.Screen name="Perfil" component={UserInfoScreen} options={{headerShown:true}} />
    </Tab.Navigator>
  );
}