import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";

export default function Search({ navigation }) {
  const { width } = Dimensions.get("window");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const searchLocation = async () => {
    if (!searchInput) return;
    setErrorMsg(null);
    setIsLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=e0323d106bbdae87e861fcaefa97ec12&units=metric`
    );
    const data = await res.json();
    if (data.cod === "404") {
      setErrorMsg(data.message);
      setIsLoading(false);
      return;
    }
    setWeatherData(data);
    setIsLoading(false);
  };
  React.useEffect(() => {
    if (searchInput === "") setWeatherData(null);
  }, [searchInput]);
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
  return (
    <View className="bg-white flex-1 px-4">
      <SafeAreaView className="pt-4 gap-2">
        <View className="flex-row items-center space-x-4 mb-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold tracking-tight">
            Search location
          </Text>
        </View>
        <View className="flex-row items-center">
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="London"
            autoFocus
            clearButtonMode="always"
            className="w-5/6 p-3 rounded-xl border border-black/10 text-base tracking-tight"
          />
          <Button onPress={searchLocation} title="Search" />
        </View>
      </SafeAreaView>
      {isLoading && <ActivityIndicator color={"black"} />}
      {errorMsg && <Text className="text-red-500">{errorMsg}</Text>}
      {weatherData && (
        <View className="rounded-3xl bg-black/20 overflow-hidden">
          <LinearGradient
            colors={["#6CC3FF", "#1485D3"]}
            className="absolute top-0 right-0 left-0 w-full h-full"
          />
          <View className="p-3 items-center">
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              }}
              className="w-32 h-24"
            />
            <Text className="text-lg tracking-tight font-medium text-white/70">
              {weatherData?.name}
            </Text>
            <Text className="text-[64px] font-bold tracking-tight text-white">
              {weatherData.main?.temp.toFixed(0)}º
            </Text>
            <View className="items-center mx-auto mt-3">
              <Text className="text-white/50 tracking-tight">Feels like</Text>
              <Text className="text-lg tracking-tight text-white font-medium">
                {weatherData.main.feels_like.toFixed(0)}℃
              </Text>
            </View>
          </View>
          <View className="bg-black/10 p-4 w-full">
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
                    <Text className="text-white/80 font-medium tracking-tight">
                      {item.title}
                    </Text>
                    <Text className="text-white/60 tracking-tight text-lg">
                      {item.value}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}
