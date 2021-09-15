import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {
  Center, Button, Box
} from 'native-base';

import { 
  ClickableBox,
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';

export function AoCLoc({ navigation }) {

  const [location, setLocation] = React.useState(null);
  const [lastLoc, setLastloc] = React.useState('last location: api call here');
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [btnRefLoad, setBtnRefLoad] = React.useState(false);
  const [locPermission, setLocpermission] = React.useState('not allowed');

  async function getCurrLoc () {
    setBtnRefLoad(true);
    if(locPermission !== 'granted'){
      // get the permission if not granted yet
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLocpermission(status);
    }

    let location = await Location.getCurrentPositionAsync({});
    
    setTimeout(() => {
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0062,
        longitudeDelta: 0.0061,
      });
      setBtnRefLoad(false);
    }, 500);
  }

  async function doCheckIn() {

  }

  React.useEffect(() => {
    getCurrLoc();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = lastLoc;
  }

  return (
    <ScreenWrapper>
      <PageTitle>{text}</PageTitle>
      <MapView 
        style={styles.map} 
        showsUserLocation={true}
        followsUserLocation={true}
        region={location}
      >
        {location ? (<Marker
          coordinate={location}
          title="You was here"
          description="Last known location of you"
        />) : (<></>)}
        
      </MapView>
      <Box>
        <ClickableBox 
          btnText="Refresh"
          clickAction={() => getCurrLoc()}
          iconClass={FontAwesome}
          iconName="refresh"
          isLoading={btnRefLoad}
        />
        <ClickableBox 
          btnText="Check In"
          clickAction={() => getCurrLoc()}
          iconClass={MaterialIcons}
          iconName="add-location-alt"
          isLoading={btnRefLoad}
        />
        <ClickableBox 
          btnText="Update Location"
          clickAction={() => getCurrLoc()}
          iconClass={MaterialIcons}
          iconName="edit-location"
          isLoading={btnRefLoad}
        />
        <ClickableBox 
          btnText="Check Out"
          clickAction={() => getCurrLoc()}
          iconClass={MaterialIcons}
          iconName="wrong-location"
          isLoading={btnRefLoad}
        />

      </Box>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 200,
  },
});