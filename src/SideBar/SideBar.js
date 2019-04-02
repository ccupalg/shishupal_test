import React from "react";
import { AppRegistry, AsyncStorage, Image, ImageBackground, StatusBar, Platform, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  Content,
  Icon,
  View,
  Left,
  Body,
  Right,
} from "native-base";
import { NavigationActions } from "react-navigation";
import { Avatar, Icon as IconElement, ListItem } from 'react-native-elements';
export default class SideBar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isNavigating: false,
      dummyImage: require('../Images/dummyImage.png'),
      roles: [],
      username: null
    }

    this.routes = [
      {name:"Home", icon:"home"},
      {name:"Logout", icon:"sign-out"}
    ];

    AsyncStorage.getItem('userStorage').then((userStorage) => {
      if(userStorage) {
        this.setState({username: JSON.parse(userStorage).username})
      }
    });
    
  }

  render() {
    return (
      <Container style={{marginTop: 0, position: 'relative'}}>
        <View style={{backgroundColor: '#DFE2F1', flex: 1}}>
          <Content style={{marginTop: 10}}>
            <ListItem
              title={this.state.username ? 'Welcome, '+this.state.username : 'Welcome, guest'}
              titleStyle={{fontSize: 18, fontWeight: 'bold'}}
              underlayColor= 'transparent'
            />

            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "black",
                marginBottom: 10
              }}
            />
 
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
