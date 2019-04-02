import React from "react";
import { AppRegistry, AsyncStorage, BackHandler, ToastAndroid, ActivityIndicator, Image, ImageBackground, ScrollView, View, TouchableOpacity } from "react-native";
import { Header, Icon as IconElement } from 'react-native-elements';
import SideBar from '../SideBar/SideBar.js';
import { NavigationActions } from "react-navigation";
import OfflineNotice from "../Shared/OfflineNotice";

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Drawer
} from "native-base";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      left_icon: null
    };
    AsyncStorage.removeItem('userStorage');

    const navigateAction = NavigationActions.navigate({
      routeName: 'Login',
      action: NavigationActions.navigate({ routeName: 'Login'})
      });
      this.props.navigation.dispatch(navigateAction);
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
      // ToastAndroid.show('Back button is pressed in Logout', ToastAndroid.SHORT);
      return true;
  }

  closeDrawer() {
    return this.drawer._root.close();
  }

  render() {
    return(
      <Container>
        <Header
          leftComponent={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconElement name="chevron-left" type="font-awesome" size={18} color="#fff" underlayColor= 'transparent' onPress={() => this.props.navigation.goBack(null)}/>
              {this.state.left_icon ?
                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                  <Image
                    style={{height: 25, width: 25}}
                    resizeMode="cover"
                    source={{uri: this.state.left_icon}}
                  />
                </TouchableOpacity>
                :
                null}
            </View>}
          centerComponent={{ text: 'Log out', style: { color: 'black' } }}
          rightComponent={{ icon: 'bars', type: "font-awesome", color: 'black', size: 18, onPress: () => this.drawer._root.toggle(), underlayColor: 'transparent' }}
          outerContainerStyles={{ backgroundColor: '#FFFFFF' }}
        />
        <OfflineNotice />
        <Drawer
          side='right'
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.props} closeDrawer={()=>this.closeDrawer()}/>}
          panOpenMask={.25}
          openDrawerOffset={100}
          onOpen={() => this.drawer._root.open()}
          onClose={() => this.drawer._root.close()} >
            <View style={{backgroundColor: '#DFE2F1', flex: 1}}>
              <ActivityIndicator/>
            </View>
          </Drawer>
        </Container>
      )
    
  }
}

