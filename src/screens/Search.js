import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import background from "../../assets/background.avif";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WeatherSearchView from "../components/WeatherSearchView";
import { useLocation } from "../context/LocationContext";

export default function Search({ navigation }) {
  const { location } = useLocation();
  const insets = useSafeAreaInsets();
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=cd3ffd95c70846e09c5140130232912&q=${searchInput}&aqi=no`;
  const fetchWeatherData = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setWeatherData(data);
      setIsLoading(false);
      if (data.error) setErrorMsg(data.error.message);
    } catch (err) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (searchInput === "") setWeatherData(null);
  }, [searchInput]);
  return (
    <View className="flex-1">
      <Image source={background} className="absolute w-full h-full" />
      <ScrollView style={{ paddingTop: insets.top + 10 }}>
        <View className="flex-row items-center space-x-1 mb-4 px-5">
          <Ionicons
            onPress={() => navigation.goBack()}
            name="ios-arrow-back"
            size={32}
            color="white"
          />
          <Text className="text-white font-semibold text-3xl tracking-tight">
            Search
          </Text>
        </View>
        <View className="flex-row items-center justify-between px-5">
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="London"
            className="bg-white/10 p-3 rounded-lg w-[90%]"
            style={{ fontSize: 16, color: "white" }}
          />
          <Pressable>
            <Ionicons
              onPress={() => fetchWeatherData()}
              name="ios-search"
              size={24}
              color="white"
            />
          </Pressable>
        </View>
        {errorMsg && (
          <Text className="text-white/80 font-semibold text-center mt-5">
            {errorMsg}
          </Text>
        )}
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        {weatherData && !errorMsg && (
          <WeatherSearchView weatherData={weatherData} location={location} />
        )}
      </ScrollView>
    </View>
  );
}
