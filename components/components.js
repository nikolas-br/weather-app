import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const windowHeight = Dimensions.get("window").height;

// Full height view that show today's weather
export const TodayScreen = ({ isDark, data, locationName }) => {
  const styles = StyleSheet.create({
    tempWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    temp: {
      fontSize: 60,
      fontWeight: "bold",
      margin: 5,
    },
    celsius: {
      fontSize: 30,
      fontWeight: "bold",
      margin: 5,
    },
    weatherDescription: {
      fontSize: 20,
      color: "#8a8a8a",
      margin: 5,
    },
    locationWrapper: {
      margin: 15,
      flexDirection: "row",
      alignItems: "center",
    },
    location: {
      color: "#8a8a8a",
      fontSize: 15,
    },
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ height: 200, width: 200, marginBottom: 80 }}
        source={{
          uri: `https://www.metaweather.com/static/img/weather/png/${data.weather_state_abbr}.png`,
        }}
      />
      <View style={styles.tempWrapper}>
        <Text
          style={{
            ...styles.temp,
            color: isDark ? "#bdbdbd" : "#4d4d4d",
          }}
        >
          {Math.round(data.the_temp * 10) / 10}
        </Text>
        <Text
          style={{
            ...styles.celsius,
            color: isDark ? "#bdbdbd" : "#4d4d4d",
          }}
        >
          °C
        </Text>
      </View>
      <Text style={styles.weatherDescription}>{data.weather_state_name}</Text>

      {/* <TouchableWithoutFeedback onPress={() => console.log("PRESS")}> */}
      <View style={styles.locationWrapper}>
        <EvilIcons name="location" size={20} color="#8a8a8a" />
        <Text style={styles.location}>{locationName}</Text>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

// Vertical scrollview for ForecastBoxes of next few days
export const ForecastScrollView = ({ isDark, days }) => (
  <View
    style={{
      justifyContent: "space-evenly",
      alignContent: "space-around",
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: isDark ? "#37474f" : "#d9d9d9",
    }}
  >
    <ScrollView style={{ flex: 1 }} horizontal={true}>
      {[...days].splice(1, days.length).map((data, i) => (
        <ForecastBox key={i} data={data} />
      ))}
    </ScrollView>
  </View>
);

// Single box component for one day forecast
export const ForecastBox = ({ data }) => {
  const weatherIcon = `https://www.metaweather.com/static/img/weather/png/${data.weather_state_abbr}.png`;

  const forecastStyles = StyleSheet.create({
    container: {
      height: 180,
      width: 130,
      padding: 20,
      margin: 10,
      marginTop: 20,
      marginBottom: 20,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#62727b",
      borderRadius: 10,
    },
  });

  const temperature = Math.round(data.the_temp);
  const day = moment(data.applicable_date).format("dddd");

  return (
    <View style={forecastStyles.container}>
      <Text style={{ fontWeight: "bold" }}>{day}</Text>
      <Image
        style={{ height: 50, width: 50, margin: 10 }}
        source={{
          uri: weatherIcon,
        }}
      />
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>{temperature} °C</Text>
    </View>
  );
};

// Background gradient, lighter for sunny weather
export const MyLinearGradient = ({ isDark }) => (
  <LinearGradient
    colors={isDark ? ["#254959", "#37474f"] : ["#254959", "#d9d9d9"]}
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: windowHeight,
    }}
  />
);
