import { useMemo } from "react";
import sunny from "../../assets/icons/day/sunny.png";
import cloudy from "../../assets/icons/day/cloudy.png";
import partlyCloudy from "../../assets/icons/day/partly_cloudy.png";
import mist from "../../assets/icons/day/mist.png";
import rain from "../../assets/icons/day/rain.png";
import snow from "../../assets/icons/day/snow.png";
import thunder from "../../assets/icons/day/thunder.png";
import overcast from "../../assets/icons/day/overcast.png";
import nightClear from "../../assets/icons/night/clear.png";
import nightCloudy from "../../assets/icons/night/cloudy.png";
import nightPartlyCloudy from "../../assets/icons/night/partly_cloudy.png";
import nightMist from "../../assets/icons/night/mist.png";
import nightRain from "../../assets/icons/night/rain.png";
import nightSnow from "../../assets/icons/night/snow.png";
import nightThunder from "../../assets/icons/night/thunder.png";
import nightOvercast from "../../assets/icons/night/overcast.png";

export default function useFindIcon(condition, isDay) {
  const icon = useMemo(() => {
    switch (condition) {
      case "Sunny":
        return isDay ? sunny : nightClear;
      case "Clear":
        return isDay ? sunny : nightClear;
      case "Partly cloudy":
        return isDay ? partlyCloudy : nightPartlyCloudy;
      case "Cloudy":
        return isDay ? cloudy : nightCloudy;
      case "Overcast":
        return isDay ? overcast : nightOvercast;
      case "Mist":
        return isDay ? mist : nightMist;
      case "Patchy rain possible":
        return isDay ? rain : nightRain;
      case "Patchy snow possible":
        return isDay ? snow : nightSnow;
      case "Patchy sleet possible":
        return isDay ? snow : nightSnow;
      case "Patchy freezing drizzle possible":
        return isDay ? rain : nightRain;
      case "Thundery outbreaks possible":
        return isDay ? thunder : nightThunder;
      case "Blowing snow":
        return isDay ? snow : nightSnow;
      case "Blizzard":
        return isDay ? snow : nightSnow;
      case "Fog":
        return isDay ? mist : nightMist;
      case "Freezing fog":
        return isDay ? mist : nightMist;
      case "Patchy light drizzle":
        return isDay ? rain : nightRain;
      case "Light drizzle":
        return isDay ? rain : nightRain;
      case "Freezing drizzle":
        return isDay ? rain : nightRain;
      case "Heavy freezing drizzle":
        return isDay ? rain : nightRain;
      case "Patchy light rain":
        return isDay ? rain : nightRain;
      case "Light rain":
        return isDay ? rain : nightRain;
      case "Moderate rain at times":
        return isDay ? rain : nightRain;
      case "Moderate rain":
        return isDay ? rain : nightRain;
      case "Heavy rain at times":
        return isDay ? rain : nightRain;
      case "Heavy rain":
        return isDay ? rain : nightRain;
      case "Light freezing rain":
        return isDay ? rain : nightRain;
      case "Moderate or heavy freezing rain":
        return isDay ? rain : nightRain;
      case "Light sleet":
        return isDay ? snow : nightSnow;
      case "Moderate or heavy sleet":
        return isDay ? snow : nightSnow;
      case "Patchy light snow":
        return isDay ? snow : nightSnow;
      case "Light snow":
        return isDay ? snow : nightSnow;
      case "Patchy moderate snow":
        return isDay ? snow : nightSnow;
      case "Moderate snow":
        return isDay ? snow : nightSnow;
      case "Patchy heavy snow":
        return isDay ? snow : nightSnow;
      case "Heavy snow":
        return isDay ? snow : nightSnow;
      case "Ice pellets":
        return isDay ? snow : nightSnow;
      case "Light rain shower":
        return isDay ? rain : nightRain;
      case "Moderate or heavy rain shower":
        return isDay ? rain : nightRain;
      case "Torrential rain shower":
        return isDay ? rain : nightRain;
      case "Light sleet showers":
        return isDay ? snow : nightSnow;
      case "Moderate or heavy sleet showers":
        return isDay ? snow : nightSnow;
      case "Light snow showers":
        return isDay ? snow : nightSnow;
      case "Moderate or heavy snow showers":
        return isDay ? snow : nightSnow;
      case "Light showers of ice pellets":
        return isDay ? snow : nightSnow;
      case "Moderate or heavy showers of ice pellets":
        return isDay ? snow : nightSnow;
      case "Patchy light rain with thunder":
        return isDay ? thunder : nightThunder;
      case "Moderate or heavy rain with thunder":
        return isDay ? thunder : nightThunder;
      case "Patchy light snow with thunder":
        return isDay ? thunder : nightThunder;
      case "Moderate or heavy snow with thunder":
        return isDay ? thunder : nightThunder;
      default:
        return isDay ? sunny : nightClear;
    }
  }, [condition, isDay]);
  return icon;
}
