import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
const LocationContext = createContext();
import { ActivityIndicator, View } from "react-native";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const askLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setIsLoading(true);
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setIsLoading(false);
  };

  return (
    <LocationContext.Provider value={{ location, errorMsg, askLocation }}>
      {isLoading ? (
        <View className="flex-1 bg-white items-center justify-center z-10 absolute top-0 right-0 w-full h-full">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </LocationContext.Provider>
  );
};

export const useLocation = () => React.useContext(LocationContext);
