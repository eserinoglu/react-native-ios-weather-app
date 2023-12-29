import { View, Text, Image, StatusBar, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "../context/LocationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFindIcon from "../hooks/useFindIcon";
import dayjs from "dayjs";
import background from "../../assets/background.avif";
import sunrise from "../../assets/icons/day/sunny.png";
import sunset from "../../assets/icons/night/clear.png";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import WeatherDetails from "../components/WeatherDetails";
import ForecastData from "../components/ForecastData";

export default function WeatherScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { location } = useLocation();
  const bottomSheetRef = useRef(null);
  const snapPoints = [80, 320];
  const [weatherData, setWeatherData] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=cd3ffd95c70846e09c5140130232912&q=${location.coords.latitude},${location.coords.longitude}&aqi=no`;
  const fetchWeatherData = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setWeatherData(data);
  };
  const fetchAstronomyData = async () => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/astronomy.json?key=cd3ffd95c70846e09c5140130232912&q=${location.coords.latitude},${location.coords.longitude}&aqi=no`
    );
    const data = await res.json();
    setAstronomyData(data);
  };
  useEffect(() => {
    fetchAstronomyData();
  }, [location]);
  useEffect(() => {
    fetchWeatherData();
  }, [location]);
  return (
    <View className="flex-1 bg-black justify-around pb-24">
      <Image
        resizeMode="cover"
        source={background}
        className="absolute w-full h-full top-0 right-0 bottom-0 left-0 transform rotate-180"
      />
      <StatusBar />
      <View
        style={{ paddingTop: insets.top }}
        className="flex-row items-center justify-between"
      >
        <View className="px-5 mb-2">
          <Text className="text-white/60 tracking-tight text-lg">
            {weatherData?.location?.country}
          </Text>
          <Text className="text-white font-bold tracking-tight text-3xl">
            {weatherData?.location?.name}
          </Text>
        </View>
        <View className="mr-5">
          <Ionicons
            onPress={() => navigation.navigate("Search")}
            name="ios-search"
            size={24}
            color="white"
          />
        </View>
      </View>
      <View className="items-center">
        <Image
          resizeMode="contain"
          source={useFindIcon(
            weatherData?.current?.condition?.text,
            weatherData?.current?.is_day
          )}
          style={{ width: 250, height: 210 }}
        />
        <Text className="text-white font-bold text-[80px] tracking-tighter">
          {weatherData?.current?.temp_c.toFixed(0)}°C
        </Text>
        <Text className="text-white font-medium text-lg">
          {weatherData?.current?.condition?.text.toUpperCase()}
        </Text>
        <Text className="text-white/50 tracking-tight mt-1">
          {dayjs(weatherData?.location?.localtime).format("dddd DD")} •{" "}
          {dayjs(weatherData?.location?.localtime).format("HH:mm")}
        </Text>
      </View>
      <View className="mt-3">
        <ForecastData location={location} />
      </View>
      <BottomSheet
        handleIndicatorStyle={{ backgroundColor: "#ffffff20" }}
        backgroundComponent={({ style }) => (
          <BlurView style={style} intensity={100} tint="dark" />
        )}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
      >
        <WeatherDetails
          astronomyData={astronomyData}
          weatherData={weatherData}
        />
      </BottomSheet>
    </View>
  );
}
