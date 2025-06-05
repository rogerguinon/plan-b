import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { EventProvider } from './src/context/EventContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import AppTabs from './src/navigation/AppTabs';
import ExpensesTabs from './src/navigation/ExpensesTabs';

// Importación de pantallas
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import EventDetailScreen from './src/screens/EventDetailScreen/EventDetailScreen';
import CreateSurveyScreen from './src/screens/CreateSurveyScreen/CreateSurveyScreen';
import EditSurveyScreen from './src/screens/EditSurveyScreen/EditSurveyScreen';
import SurveysScreen from './src/screens/SurveysScreen/SurveysScreen';
import CreateEventScreen from './src/screens/CreateEventScreen/CreateEventScreen';
import ChatQuedadaScreen from './src/screens/ChatQuedadaScreen/ChatQuedadaScreen';
import UserInfoScreen from './src/screens/UserInfoScreen/UserInfoScreen';
import CreateExpenseScreen from './src/screens/ExpenseTrackerScreens/CreateExpenseScreen'
import EditEventScreen from './src/screens/EditEventScreen/EditEventScreen';
import GroupDetailScreen from './src/screens/GroupDetailScreen/GroupDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Envuelve toda la navegación con el provider
    <EventProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"> 
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false, title: 'Inicio'}}/>
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
            <Stack.Screen name="Detalles" component={EventDetailScreen} options={{headerBackTitle: 'Inicio'}} />
            <Stack.Screen name="Crear" component={CreateSurveyScreen} />
            <Stack.Screen name="Editar" component={EditSurveyScreen} />
            <Stack.Screen name="Encuestas" component={SurveysScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{title: 'Crear quedada'}}/>
            <Stack.Screen name="ChatQuedada" component={ChatQuedadaScreen} options={{presentation: 'modal', animation: 'slide_from_bottom'}} />
            <Stack.Screen name="EditEvent" component={EditEventScreen} options={{title: 'Editar quedada'}}/>
            <Stack.Screen name="DetallesGrupo" component={GroupDetailScreen} options={{title: 'Detalles'}}/>
            <Stack.Screen name="GastosEvento" component={ExpensesTabs} />
            <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} options={{ title: 'Nuevo Gasto' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseProvider>
    </EventProvider>
  )
};
