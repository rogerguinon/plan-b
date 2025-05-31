import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import AppTabs from './src/navigation/AppTabs';
import EventDetailScreen from './src/screens/EventDetailScreen/EventDetailScreen';
import CreateSurveyScreen from './src/screens/CreateSurveyScreen/CreateSurveyScreen';
import EditSurveyScreen from './src/screens/EditSurveyScreen/EditSurveyScreen';
import SurveysScreen from './src/screens/SurveysScreen/SurveysScreen';
import { EventProvider } from './src/context/EventContext';
import CreateEventScreen from './src/screens/CreateEventScreen/CreateEventScreen';
import ChatQuedadaScreen from './src/screens/ChatQuedadaScreen/ChatQuedadaScreen';
import UserInfoScreen from './src/screens/UserInfoScreen/UserInfoScreen';
import EditEventScreen from './src/screens/EditEventScreen/EditEventScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Envuelve toda la navegación con el provider
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main"> 
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          <Stack.Screen name="Detalles" component={EventDetailScreen} />
          <Stack.Screen name="Crear" component={CreateSurveyScreen} />
          <Stack.Screen name="Editar" component={EditSurveyScreen} />
          <Stack.Screen name="Encuestas" component={SurveysScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ChatQuedada" component={ChatQuedadaScreen} 
                    options={{presentation: 'modal', animation: 'slide_from_bottom'}} />
          <Stack.Screen name="EditEvent" component={EditEventScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  )
};
