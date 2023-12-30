import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import background from "../../assets/background.avif";
import { useLocation } from "../context/LocationContext";
import location from "../../assets/location.png";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome() {
  const { askLocation } = useLocation();
  return (
    <View className="flex-1 items-center justify-center">
      <Image source={background} className="absolute w-full h-full" />
      <Image
        resizeMode="contain"
        source={location}
        style={{ width: 300, height: 300 }}
      />
      <Text className="text-white/80 font-bold tracking-tight text-2xl text-center px-7 mt-3 mb-10">
        Allow access to your location to get the weather forecast for your area.
      </Text>
      <Pressable
        onPress={() => askLocation()}
        className="bg-white/20 rounded-xl p-3 flex-row items-center shadow-xl w-[93%] justify-center mx-auto space-x-2"
      >
        <Ionicons name="ios-location" size={24} color="white" />
        <Text className="text-lg font-semibold tracking-tight text-white">
          Share location
        </Text>
      </Pressable>
    </View>
  );
}
