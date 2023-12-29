import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import useFindIcon from "../hooks/useFindIcon";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

export default function ForecastData({ location }) {
  const [forecastData, setForecastData] = useState(null);
  const fetchForecastData = async () => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=cd3ffd95c70846e09c5140130232912&q=${location.coords.latitude}, ${location.coords.longitude}&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();
    setForecastData(data);
  };
  const now = new Date();
  const [dayIndex, setDayIndex] = useState(0);
  useEffect(() => {
    fetchForecastData();
  }, [location]);
  return (
    <View>
      <View className="flex-row items-center space-x-1 self-center mb-4">
        <Pressable
          style={{ opacity: dayIndex === 0 ? 0.5 : 1 }}
          disabled={dayIndex === 0}
          onPress={() => setDayIndex(dayIndex - 1)}
          className="bg-white/20 p-1 rounded-xl"
        >
          <Ionicons name="ios-chevron-back" size={24} color="white" />
        </Pressable>
        <View className="py-2 w-24 items-center bg-white/20 rounded-xl">
          <Text className="text-white font-semibold tracking-tight">
            {dayjs(forecastData?.forecast?.forecastday[dayIndex]?.date).format(
              "dddd"
            )}
          </Text>
        </View>
        <Pressable
          style={{ opacity: dayIndex === 6 ? 0.5 : 1 }}
          disabled={dayIndex === 6}
          onPress={() => setDayIndex(dayIndex + 1)}
          className="bg-white/20 p-1 rounded-xl"
        >
          <Ionicons name="ios-chevron-forward" size={24} color="white" />
        </Pressable>
      </View>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={forecastData?.forecast?.forecastday[dayIndex]?.hour}
        keyExtractor={(item) => item.time_epoch.toString()}
        renderItem={({ item, index }) => (
          <ForecastView item={item} index={index} />
        )}
      />
    </View>
  );
}

function ForecastView({ item, index }) {
  return (
    <View
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === 23 ? 16 : 0,
      }}
      className="items-center space-y-2"
    >
      <Text className="text-white/50 tracking-tight font-semibold">
        {dayjs(item.time).format("HH:mm")}
      </Text>
      <View className="py-3 rounded-lg bg-white/10 items-center w-24">
        <Image
          source={useFindIcon(item.condition.text, item.is_day)}
          style={{ width: 40, height: 40 }}
        />
        <Text className="text-white font-semibold tracking-tight text-xl mt-1">
          {item.temp_c.toFixed(0)}°C
        </Text>
        <View className="flex-row items-center space-x-1 mt-2">
          <Ionicons name="ios-water" size={14} color="#ffffff50" />
          <Text className="text-white/50 text-sm">{item.chance_of_rain}%</Text>
        </View>
      </View>
    </View>
  );
}
