import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpensesScreen from '../screens/ExpenseTrackerScreens/ExpenseScreen';
import BalancesScreen from '../screens/ExpenseTrackerScreens/BalanceScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function ExpensesTabs({ route }) {
  const navigation = useNavigation();
  const { event } = route.params;

  useEffect(() => {
    if (event?.title) {
      navigation.setOptions({ title: event.title });
    }
  }, [navigation, event]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#d46bcf' },
      }}
    >
      <Tab.Screen name="Gastos">
        {() => <ExpensesScreen event={event} />}
      </Tab.Screen>
      <Tab.Screen name="Saldos">
        {() => <BalancesScreen event={event} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}