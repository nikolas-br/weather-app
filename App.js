import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import { getLocation, getWeatherData } from "./utils/utils";
import {
  TodayScreen,
  ForecastScrollView,
  MyLinearGradient,
} from "./components/components";

const windowHeight = Dimensions.get("window").height;

class App extends Component {
  state = {
    weatherObj: {},
    days: [],
    locationName: "",
    isDark: true,
    isError: false,
  };

  // Get location of device and fetch weather for nearest city
  async componentDidMount() {
    const location = await getLocation();

    if (!location) {
      this.setState({ isError: true });
      return;
    }

    getWeatherData(location)
      .then((weatherObj) => {
        let isDark;
        // Set a lighter background for sunny weather
        if (
          weatherObj.consolidated_weather[0].weather_state_abbr === "c" ||
          weatherObj.consolidated_weather[0].weather_state_abbr === "lc"
        )
          isDark = false;
        else isDark = true;

        this.setState({
          weatherObj,
          days: weatherObj.consolidated_weather,
          locationName: weatherObj.title,
          isDark,
        });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  render() {
    const styles = StyleSheet.create({
      main: {
        height: windowHeight,
        alignItems: "center",
        justifyContent: "center",
      },
    });

    // Empty screen while loading, handling error message
    if (!this.state.days.length || this.state.isError) {
      if (this.state.isError) Alert.alert("Location could not be loaded...");

      return (
        <View style={{ flex: 1 }}>
          <MyLinearGradient isDark={this.state.isDark} />
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#254959" }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#254959" }}>
          <View style={styles.main}>
            <MyLinearGradient isDark={this.state.isDark} />

            <TodayScreen
              isDark={this.state.isDark}
              data={this.state.days[0]}
              locationName={this.state.locationName}
            />
          </View>

          <ForecastScrollView
            isDark={this.state.isDark}
            days={this.state.days}
          />
        </ScrollView>
        <StatusBar translucent={true} />
      </SafeAreaView>
    );
  }
}

export default App;
