import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpensesScreen from '../screens/ExpenseTrackerScreens/ExpenseScreen';
import BalancesScreen from '../screens/ExpenseTrackerScreens/BalanceScreen';

const Tab = createMaterialTopTabNavigator();

export default function ExpensesTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#d46bcf' },
      }}
    >
      <Tab.Screen name="Gastos" component={ExpensesScreen} />
      <Tab.Screen name="Saldos" component={BalancesScreen} />
    </Tab.Navigator>
  );
}