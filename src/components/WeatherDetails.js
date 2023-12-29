import { View, Text, Image } from "react-native";
import React from "react";
import sunrise from "../../assets/icons/day/sunny.png";
import sunset from "../../assets/icons/night/clear.png";

export default function WeatherDetails({ astronomyData, weatherData }) {
  return (
    <View className="px-5">
      <Text className="text-white/60 tracking-tight text-center text-xl font-semibold mb-3">
        Details
      </Text>
      <View className="flex-row items-center justify-between border-b border-white/10 py-3">
        <View className="flex-row items-center space-x-2">
          <Image source={sunrise} style={{ width: 40, height: 35 }} />
          <View>
            <Text className="text-white/50 tracking-tight text-base">
              Sunrise
            </Text>
            <Text className="text-white font-medium text-lg tracking-tight">
              {astronomyData?.astronomy?.astro?.sunrise}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          <Image source={sunset} style={{ width: 40, height: 35 }} />
          <View className="items-end">
            <Text className="text-white/50 tracking-tight text-base">
              Sunset
            </Text>
            <Text className="text-white font-medium text-lg tracking-tight">
              {astronomyData?.astronomy?.astro?.sunset}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between border-b border-white/10 py-3">
        <View>
          <Text className="text-white/50 text-base tracking-tight">
            Humidity
          </Text>
          <Text className="text-white font-semibold text-lg tracking-tight">
            {weatherData?.current?.humidity}%
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-white/50 text-base tracking-tight">Wind</Text>
          <Text className="text-white font-semibold text-lg tracking-tight">
            {weatherData?.current?.wind_kph} km/h
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between py-3">
        <View>
          <Text className="text-white/50 text-base tracking-tight">
            Feels like
          </Text>
          <Text className="text-white font-semibold text-lg tracking-tight">
            {weatherData?.current?.feelslike_c.toFixed(0)}°C
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-white/50 text-base tracking-tight">Cloud</Text>
          <Text className="text-white font-semibold text-lg tracking-tight">
            {weatherData?.current?.cloud}%
          </Text>
        </View>
      </View>
    </View>
  );
}
