import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import AppTabs from './src/navigation/AppTabs';
import CreateEvent from './src/screens/CreateEventScreen/CreateEventScreen';
import CreateSurveyScreen from './src/screens/CreateSurveyScreen/CreateSurveyScreen';
import EditSurveyScreen from './src/screens/EditSurveyScreen/EditSurveyScreen';
import SurveysScreen from './src/screens/SurveysScreen/SurveysScreen';
import { EventProvider } from './src/context/EventContext';

const Stack = createNativeStackNavigator();
// hola
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={AppTabs} options={{headerShown: false}}/>
        <Stack.Screen name="Detalles" component={EventDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};