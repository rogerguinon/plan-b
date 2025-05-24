import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import AppTabs from './src/navigation/AppTabs';
import CreateEvent from './src/screens/CreateEventScreen/CreateEventScreen';

const Stack = createNativeStackNavigator();
// hola
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateEvent" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={AppTabs} />
        <Stack.Screen name="CreateEvent" component={CreateEvent}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

