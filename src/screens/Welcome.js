import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import image from "../../assets/vector.jpeg";
import { useLocation } from "../context/LocationContext";

export default function Welcome() {
  const { askLocation } = useLocation();
  return (
    <View className="flex-1 bg-white items-center justify-center px-5">
      <Image source={image} className="w-48 h-48 mb-5" />
      <Text className="text-black/80 font-bold tracking-tight text-3xl text-center">
        Welcome to Weather App
      </Text>
      <Text className="text-black/60 tracking-tight mt-2 text-center">
        Allow us to use your location to show you the weather forecast.
      </Text>
      <TouchableOpacity
        className="bg-blue-600 rounded-lg px-5 py-3 mt-5"
        onPress={() => askLocation()}
      >
        <Text className="text-white tracking-tight font-medium text-lg">
          Allow location
        </Text>
      </TouchableOpacity>
    </View>
  );
}
