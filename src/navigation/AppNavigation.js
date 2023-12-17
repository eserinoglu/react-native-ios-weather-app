import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLocation } from "../context/LocationContext";

const Stack = createNativeStackNavigator();

//Screens
import Welcome from "../screens/Welcome";
import WeatherScreen from "../screens/WeatherScreen";

export default function AppNavigation() {
  const { location } = useLocation();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {location ? (
          <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        ) : (
          <Stack.Screen name="Welcome" component={Welcome} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
