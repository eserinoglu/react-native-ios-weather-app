import "react-native-gesture-handler";
import AppNavigation from "./src/navigation/AppNavigation";
import { LocationProvider } from "./src/context/LocationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <LocationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </LocationProvider>
  );
}
