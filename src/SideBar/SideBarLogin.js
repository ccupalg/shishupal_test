import React from "react";
import { AppRegistry, AsyncStorage, Image, ImageBackground, StatusBar, Platform, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
  Left,
  Body,
  Right,
} from "native-base";
import { NavigationActions, createStackNavigator } from "react-navigation";
import { Avatar, Icon as IconElement } from 'react-native-elements';
export default class SideBarLogin extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isNavigating: false,
    }

    this.routes = [
      {name:"Login", icon:"sign-in"}
    ];
    
  }

  render() {
    return (
      <Container style={{marginTop: 0, position: 'relative'}}>
        <View style={{backgroundColor: '#DFE2F1', flex: 1}}>
          <Content>
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <View style={{flexDirection: 'row'}}>
                <IconElement raised size={17} name='handshake-o' type='font-awesome' color='#9ACD32'/>
                <Text style={{color: 'black', alignSelf: 'center'}}>Welcome, Guest.</Text>
              </View>
            </View>
            {
              this.routes.map((data, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{backgroundColor: 'transparent', flexDirection: 'row', paddingLeft: 20, paddingTop: 17}}
                    onPress={() => !this.state.isNavigating ? (this.state.isNavigating = true, data.name === 'Profile' ? this.goToUserProfile() : this.props.navigator.navigation.navigate(data.name, {from_sidebar: true})+ this.props.closeDrawer(), setTimeout(this.toggleNavigation.bind(this), 700)) : ''}
                  >
                    <IconElement name={data.icon} type='font-awesome' color='black'/>
                    <Text style={{backgroundColor: 'transparent', color: 'black', fontSize: 20, marginLeft: 17}}>{data.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </Content>
        </View>        
      </Container>
    );
  }

  toggleNavigation() {
    this.state.isNavigating = false;
  }

}
