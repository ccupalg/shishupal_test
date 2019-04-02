import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import {AppLoading, Font, Permissions} from "expo";

import Login from "./src/AllScreen/index.js";
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      'FontAwesome': require('@expo/vector-icons/fonts/FontAwesome.ttf')
    });
    
    const result = await Permissions.askAsync(Permissions.CAMERA);

    const result2 = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    this.setState({ isReady: true });
  }
  render() {

    
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return <Login />;
  }
}
