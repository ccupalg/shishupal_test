import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Platform, ImageBackground, AsyncStorage, TouchableOpacity, TouchableHighlight, ActivityIndicator, Modal, BackHandler, Alert } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, ListItem, Button, Badge, Header, ButtonGroup, SearchBar, Icon as IconElement, Card } from 'react-native-elements';

import {Drawer, Container, Icon, Left, Body, Footer } from "native-base";
import { NavigationActions } from "react-navigation";

import ImageSlider from 'react-native-image-slider';
import Constants from '../AllScreen/Config';
export default class HeaderCommon extends React.Component {
  constructor(props) {
    super(props);
    console.log("NAV header: ", this.props.navigation.state.params);
    this.state = {
      dummyImage: require('../Images/dummyImage.png'),
      loadingScreen: true,
      loading: false,
      cartStorage: []
    };

    AsyncStorage.getItem('beforeHomePageAds').then((beforeHomePageAds) => {
      console.log('beforeHomePageAds 4');
      console.log(beforeHomePageAds);
      if(beforeHomePageAds) {
        this.setState({
          beforeHomePageAds: JSON.parse(beforeHomePageAds)
        });
      }
    });

    AsyncStorage.getItem('bottomAds').then((bottomAds) => {
      console.log('bottomAds 4');
      console.log(bottomAds);
      if(bottomAds) {
        this.setState({
          bottomAds: JSON.parse(bottomAds)
        });
      }
    });

    AsyncStorage.getItem('token').then((token) => {
      console.log('token 4');
      console.log(token);
      if(token) {
        this.setState({
          token: token
        });
      }
    });

    AsyncStorage.getItem('client').then((client) => {
      console.log('client 4');
      console.log(client);
      if(client) {
        this.setState({
          client: client
        });
      }
    });

    AsyncStorage.getItem('uid').then((uid) => {
      console.log('uid 4');
      console.log(uid);
      if(uid) {
        this.setState({
          uid: uid
        });
      }
    });

    AsyncStorage.getItem('cartStorage').then((cartStorage) => {
      console.log('cartStorage 4');
      console.log(JSON.parse(cartStorage));
      if(cartStorage) {
        this.setState({
          cartStorage: JSON.parse(cartStorage)
        });
      }
    });

    AsyncStorage.getItem('userStorage').then((userStorage) => {
      if(userStorage) {
        console.log('JSON.parse(userStorage)');
        console.log(JSON.parse(userStorage));
        this.setState({
          userStorage: JSON.parse(userStorage),
          username: JSON.parse(userStorage).username
        });
      }
    });

  }

  goToHome() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'HomeScreen',
      params: { from: 'Header' },
      action: NavigationActions.navigate({ routeName: 'HomeScreen'})
      });
      this.props.navigation.dispatch(navigateAction);
  }

  goToCartScreen() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'CartScreen',
      params: { from: 'Header' },
      action: NavigationActions.navigate({ routeName: 'CartScreen'})
      });
      this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {this.props.headerTitle !== 'Home' ?
              <IconElement name="chevron-left" size={18} type='font-awesome' color="black" underlayColor= 'transparent' onPress={() => (this.props.navigation.state.params.onGoBack ? this.props.navigation.state.params.onGoBack() : '') + this.props.navigation.goBack(null)}/>
              :
              null}
              <TouchableOpacity>
                <IconElement name="home" size={18} type='font-awesome' color="black" underlayColor= 'transparent' onPress={() => this.goToHome()}/>
              </TouchableOpacity>
            </View>}
          centerComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{color: 'black', marginRight: 20}}>{this.props.headerTitle}</Text>
            </View>
          }
          rightComponent={{ icon: 'bars', type: 'font-awesome', size: 18, color: 'black', onPress: () => this.props.toggleDrawer(), underlayColor: 'transparent' }}
          outerContainerStyles={{ backgroundColor: '#FFFFFF' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});