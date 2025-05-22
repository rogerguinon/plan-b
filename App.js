import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import AppTabs from './src/navigation/AppTabs';
import EventDetailScreen from './src/screens/EventDetailScreen/EventDetailScreen';
import CreateSurveyScreen from './src/screens/CreateSurveyScreen/CreateSurveyScreen';
import EditSurveyScreen from './src/screens/EditSurveyScreen/EditSurveyScreen';
import SurveysScreen from './src/screens/SurveysScreen/SurveysScreen';
import { EventProvider } from './src/context/EventContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Envuelve toda la navegación con el provider
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detalles" component={EventDetailScreen} />
          <Stack.Screen name="Crear" component={CreateSurveyScreen} />
          <Stack.Screen name="Editar" component={EditSurveyScreen} />
          <Stack.Screen name="Encuestas" component={SurveysScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
}