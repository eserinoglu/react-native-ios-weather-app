import { View, Text, Image } from "react-native";
import React from "react";
import useFindIcon from "../hooks/useFindIcon";
import dayjs from "dayjs";
import ForecastData from "../components/ForecastData";

export default function WeatherSearchView({ weatherData, location }) {
  return (
    <View className="justify-around">
      <View className="flex-row items-center justify-between">
        <View className="mb-2 mt-5 px-5">
          <Text className="text-white/60 tracking-tight text-lg">
            {weatherData?.location?.country}
          </Text>
          <Text className="text-white font-bold tracking-tight text-3xl">
            {weatherData?.location?.name}
          </Text>
        </View>
      </View>
      <View className="items-center">
        <Image
          resizeMode="contain"
          source={useFindIcon(
            weatherData?.current?.condition?.text,
            weatherData?.current?.is_day
          )}
          style={{ width: 200, height: 160 }}
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
    </View>
  );
}
