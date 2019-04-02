import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Platform, ImageBackground, AsyncStorage, TouchableOpacity } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Card, ListItem, Icon as IconElement, Button, Badge, Header } from 'react-native-elements';

import {Drawer, Container } from "native-base";
import { Permissions, Notifications } from 'expo';

import { NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from './Config';

import SideBarLogin from '../SideBar/SideBarLogin.js';
import OfflineNotice from "../Shared/OfflineNotice";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: '',
      usernameErr: '',
      passwordErr: '',
      loginErr: '',
      loading: false
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    AsyncStorage.getItem('userStorage').then((userStorage) => {
      if(userStorage) {
        console.log('JSON.parse(userStorage)');
        console.log(JSON.parse(userStorage));

        this.goToHomeScreen();
      }else {
        // this.goToHomeScreen();

      }
    });

  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  login() {
    this.validated = true;

    if(this.validated && !this.state.username) {
      this.validated = false;
      this.inputs['username'].shake();
      this.setState({usernameErr: 'please enter username!'})
    }

    if(this.validated && !this.state.password) {
      this.validated = false;
      this.inputs['password'].shake();
      this.setState({passwordErr: 'please enter password!'})
    }

    //Not Registered Check
    if(this.validated){
      this.setState({
        loading: true
      });

      let user_info_storage = [
        ['userStorage', JSON.stringify({username: this.state.username, password: this.state.password})]
      ];
      AsyncStorage.multiSet(user_info_storage);

      this.setState({loading: false});
      this.goToHomeScreen();
    }
  }

  goToHomeScreen() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'HomeScreen',
      params: { from: 'LoginScreen' },
      action: NavigationActions.navigate({ routeName: 'HomeScreen'})
      });
      this.props.navigation.dispatch(navigateAction);
  }

  closeDrawer() {
    return this.drawer._root.close();
  }

  render() {
    return (
      <Container>
        <Header
          leftComponent={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconElement type="font-awesome" name="chevron-left" size={20} color="black" underlayColor= 'transparent' onPress={() => this.props.navigation.goBack(null)}/>
            {this.state.left_icon ?
              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  style={{height: 25, width: 25}}
                  resizeMode="cover"
                  source={{uri: this.state.left_icon}}
                />
              </TouchableOpacity>
              :
              null
            }
            </View>}
          centerComponent={{ text: 'Login', style: { color: 'black' } }}
          rightComponent={{ icon: 'bars', type: "font-awesome", color: 'black', size: 20, onPress: () => this.drawer._root.toggle(), underlayColor: 'transparent' }}
          outerContainerStyles={{ backgroundColor: '#FFFFFF' }}
        />
        <OfflineNotice />
        <Drawer
          side='right'
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBarLogin navigator={this.props} closeDrawer={()=>this.closeDrawer()}/>}
          panOpenMask={.25}
          openDrawerOffset={100}
          onOpen={() => this.drawer._root.open()}
          onClose={() => this.drawer._root.close()} >
          <View style={{backgroundColor: '#DFE2F1', flex: 1}}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                style={{ backgroundColor: 'transparent' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
              >

              <View style={{marginBottom: 70}}>
                <View style={{backgroundColor: '#0130BE', height: '40%', alignItems: 'center'}}>
                  <Image
                    style={{height: 100, width: 100, marginTop: 30}}
                    resizeMode="stretch"
                    source={require('../Images/logo.png')}
                  />
                </View>
                <View style={{bottom: 0, marginTop: -70}}>
                  <View style={{}}>
                    <View style={{backgroundColor: 'white', borderRadius: 4, margin: 25, marginBottom: 20}}>
                      <FormLabel labelStyle={{color: '#0130BE'}}>Phone no</FormLabel>
                      <FormInput ref={ input => {this.inputs['username'] = input;}} onSubmitEditing={() => {this.focusNextField('password');}} returnKeyType={ "next" } inputStyle={{color: 'black'}} placeholderTextColor="gray" placeholder={'enter username'} onChangeText={(username)=> this.setState({username: username, loginErr: '', usernameErr: ''})}/>
                      <FormValidationMessage>{this.state.usernameErr}</FormValidationMessage>

                      <FormLabel labelStyle={{color: '#0130BE'}}>Password</FormLabel>
                      <FormInput ref={ input => {this.inputs['password'] = input;}} onSubmitEditing={() => {this.login();}} returnKeyType={ "next" } inputStyle={{color: 'black'}} placeholderTextColor="gray" secureTextEntry={true} placeholder={'********'} onChangeText={(password)=> this.setState({password: password, loginErr: '', passwordErr: ''})}/>
                      <FormValidationMessage>{this.state.passwordErr}</FormValidationMessage>
                      <FormValidationMessage>{this.state.loginErr}</FormValidationMessage>
                      
                      <Button
                        rounded
                        loadingRight={true}
                        disabled={this.state.loading}
                        loading={this.state.loading}
                        onPress={()=> this.login()}
                        backgroundColor= '#0130BE'
                        icon={{name: 'sign-in', type: 'font-awesome'}}
                        containerViewStyle={{marginBottom: 20}}
                        title='Login' />
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});
