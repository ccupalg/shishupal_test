import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Platform, ImageBackground, AsyncStorage, TouchableOpacity, TouchableHighlight, ActivityIndicator, Modal, BackHandler, Alert } from 'react-native';
import { ListItem, Button, Badge, Header, ButtonGroup, SearchBar, Icon as IconElement, Card } from 'react-native-elements';
import {Drawer, Container, Icon, Left, Body, Footer, Tab, Tabs } from "native-base";
import { NavigationActions } from "react-navigation";

import CommonHeaderScreen from "../Shared/Header.js";
import OfflineNotice from "../Shared/OfflineNotice";
import Constants from './Config';
import SideBar from '../SideBar/SideBar.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home_screen_data: [],
      dummyImage: require('../Images/dummyImage.png'),
      loadingScreen: true,
      username: ''
    };

    AsyncStorage.getItem('userStorage').then((userStorage) => {
      if(userStorage) {
        console.log('JSON.parse(userStorage)');
        console.log(JSON.parse(userStorage));
        this.setState({username: JSON.parse(userStorage).username})
        this.getHomeScreenData();
      }
    });

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  getHomeScreenData() {
    fetch(Constants.apiBaseUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson inside Get getHomeScreenData');
      console.log(responseJson);

      if(responseJson) {
        if(!responseJson.error){
          this.setState({
            home_screen_data: responseJson,
            loadingScreen: false
          }); 
        }else {
          this.setState({loadingScreen: false});
          alert(esponseJson.error);
        }
      }
    });
  }

  closeDrawer() {
    return this.drawer._root.close();
  }

  refreshData() {
    this.getHomeScreenData();
  }

  render() {
    return (
      <Container>
        <CommonHeaderScreen {...this.props} toggleDrawer={()=>{return this.drawer._root.toggle()}} headerTitle={"Home Screen"} />
        <OfflineNotice />
        <Drawer
          side='right'
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.props} closeDrawer={()=>this.closeDrawer()}/>}
          panOpenMask={0.25}
          openDrawerOffset={100}
          onOpen={() => this.drawer._root.open()}
          onClose={() => this.drawer._root.close()} >
          <View style={{backgroundColor: '#DFE2F1', flex: 1}}>
          {this.state.loadingScreen ? 
            <ActivityIndicator />
            :
            <ScrollView>
              <View style={{marginTop: 10}}>
              {
                this.state.username ?
                <View style={{margin: 10, backgroundColor: 'white', borderRadius: 7, flexWrap: 'wrap'}}>
                  <Text style={{margin: 10, fontSize: 22, alignSelf: 'center'}}>{this.state.username}</Text>
                </View>
                :
                null
              }
              {
                this.state.home_screen_data.map((u, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={u.title}
                      subtitle={u.detail}
                      avatar={u.img_url ? {uri: u.img_url} : this.state.dummyImage}
                    />
                  );
                })
              }

              {
                !this.state.loadingPage && this.state.home_screen_data.length === 0 ?
                <Text style={{color: '#99003d', margin: 20, textAlign: 'center'}}> currently no data available, please stay tuned! </Text>
                :
                null
              }

              {
                this.state.loadingPage ?
                <Image source={require('../Images/loadingPage.gif')} style={{ alignSelf: 'center', height: 50, width: 50}} />
                :
                null
              }
              </View>
            </ScrollView>
            }
          </View>
        </Drawer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
