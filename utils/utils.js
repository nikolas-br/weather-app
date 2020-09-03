import * as Location from "expo-location";

export const getLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") return null;

  const { coords } = await Location.getCurrentPositionAsync({});

  return { latitude: coords.latitude, longitude: coords.longitude };
};

export const getWeatherData = async (location) => {
  const locationQuery = `https://www.metaweather.com/api/location/search/?lattlong=${location.latitude},${location.longitude}`;
  const locations = await fetch(locationQuery)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });

  if (typeof locations[0].woeid !== "number") throw new Error();

  const weatherQuery = `https://www.metaweather.com/api/location/${locations[0].woeid}`;
  const weatherObj = await fetch(weatherQuery)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });

  return weatherObj;
};
