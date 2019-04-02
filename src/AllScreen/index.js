import React, { Component } from "react";
import Login from "./Login.js";
import Logout from "./Logout.js";
import HomeScreen from "./HomeScreen.js";

import { DrawerNavigator, createStackNavigator } from "react-navigation";


const MainNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Logout: { screen: Logout },
    HomeScreen: { screen: HomeScreen }
  },
  {
    headerMode: 'none',
  }
);

export default MainNavigator;
