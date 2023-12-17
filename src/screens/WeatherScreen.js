import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function WeatherScreen() {
  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=e0323d106bbdae87e861fcaefa97ec12&units=metric`;
  const fetchWeatherData = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setWeatherData(data);
  };
  useEffect(() => {
    fetchWeatherData();
  }, [location]);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = ["38%"];
  const humidity = weatherData?.main.humidity;
  const wind = weatherData?.wind.speed;
  const maxTemp = weatherData?.main.temp_max.toFixed(0);
  const minTemp = weatherData?.main.temp_min.toFixed(0);
  const sunrise = dayjs(weatherData?.sys.sunrise * 1000).format("hh:mm");
  const sunset = dayjs(weatherData?.sys.sunset * 1000).format("hh:mm");
  const datas = [
    { title: "Humidity", value: humidity + "%", icon: "water-outline" },
    { title: "Wind", value: wind + "km/h", icon: "wind" },
    {
      title: "Max Temp",
      value: maxTemp + "℃",
      icon: "thermometer",
    },
    {
      title: "Min Temp",
      value: minTemp + "℃",
      icon: "thermometer-half",
    },
    { title: "Sunrise", value: sunrise + " am", icon: "sunrise" },
    { title: "Sunset", value: sunset + " pm", icon: "sunset" },
  ];
  if (weatherData) {
    return (
      <View className="flex-1">
        <LinearGradient
          colors={["#6CC3FF", "#1485D3"]}
          className="absolute top-0 right-0 left-0 w-full h-full"
        />
        <View style={{ paddingTop: insets.top + 30, paddingHorizontal: 16 }}>
          <View className="flex-row items-center justify-between pr-4">
            <View>
              <Text className="text-white/80 font-medium tracking-tight text-lg">
                {weatherData?.sys.country}
              </Text>
              <Text className="text-white tracking-tight font-semibold text-2xl">
                {weatherData?.name}
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome5 name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            className="w-36 aspect-square mx-auto mt-5"
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            }}
          />
          <Text className="mx-auto text-white/60 tracking-tight">
            {weatherData.weather[0].main}
          </Text>
          <Text className="text-[82px] font-bold tracking-tight text-white mx-auto">
            {weatherData.main.temp.toFixed(0)}℃
          </Text>
          <View className="items-center mx-auto mt-3">
            <Text className="text-white/50 tracking-tight">Feels like</Text>
            <Text className="text-lg tracking-tight text-white font-medium">
              {weatherData.main.feels_like.toFixed(0)}℃
            </Text>
          </View>
        </View>
        <BottomSheet
          backgroundComponent={({ style }) => (
            <BlurView style={style} tint="light" intensity={100} />
          )}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
        >
          <View className="w-full h-full p-4 flex-col space-y-3">
            <FlatList
              numColumns={2}
              key={2}
              scrollEnabled={false}
              data={datas}
              contentContainerStyle={{ gap: 6 }}
              columnWrapperStyle={{ gap: 6 }}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <View
                  className="bg-black/5 flex-row items-center p-3 rounded-xl"
                  style={{ width: (width - 38) / 2 }}
                >
                  <View className="flex-col">
                    <Text className="text-black/80 font-medium tracking-tight">
                      {item.title}
                    </Text>
                    <Text className="text-black/60 tracking-tight text-lg">
                      {item.value}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </BottomSheet>
      </View>
    );
  }
}
