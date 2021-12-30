import React from 'react';
import {
  Center, Button, View, Text, VStack, HStack, IconButton, Icon, ScrollView, Box, useColorModeValue, FlatList
} from 'native-base';
import axios from 'axios';
import { 
  ClickableBox,
  DarkModeToggle, FormContainer, ItemCards, PageTitle, ScreenWrapper, unifi_c1, unifi_c4, unifi_c6, unifi_c7, unifi_primary
} from '../../components/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTokerr, setUserObj, selectBaseUrl, selectUserToken } from '../../app/userSlice';


export function AoMain({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);

  const cc_outer_bg = useColorModeValue(unifi_c6, unifi_c7);

  // current check in list
  const [list, setList] = React.useState([]);
  // active reservations
  const [reserves, setReserves] = React.useState([]);
  const config = {
      headers: { Authorization: `Bearer ${stoken}` }
  };

  const handleCheckout = (index: number) => {
    
    const theinput = { 
      id: index
    };

    axios.post(
      baseurl + 't/ao/doCheckout', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          alert('Check-out Successful. ')
          loadData();
        } else {
          alert('Check-in failed. ' + response.data.msg)
        }
      }
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert(JSON.stringify(error.response));
        }
      } else {
        alert(JSON.stringify(error));
      }

      // navigation.goBack();
      return;
      
    });

  };

  async function loadData() {
    console.log("ao loading");
    setRefreshing(true);
    const getckurl = baseurl + 't/ao/getCurrentCheckins';
    const getrsvpurl = baseurl + 't/ao/getCurrentReservations';
    

    axios.post(
      getckurl, null, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(response.data.msg);
      } else {
        setList(response.data.data.checkins);
        console.log("ck loaded");
        setRefreshing(false);
      }
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert(JSON.stringify(error.response.data));
        }
      }
      
    });

    axios.post(
      getrsvpurl, null, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(response.data.msg);
      } else {
        setReserves(response.data.data.checkins);
        console.log("rsvp loaded");
        setRefreshing(false);
      }
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert(JSON.stringify(error.response.data));
        }
      }
      
    });
    
  }

  React.useEffect(() => {
    loadData();

    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData();
    });

    return willFocusSubscription;
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView 
        w="100%" 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
      >
      <Box m={3}
      p={2}
        bg={cc_outer_bg}
        w="95%"
        rounded="10px"
      >
      
      { list.length > 0 ? (
        <>
        <Text m={2}>Current workspace checkins</Text>
        <FlatList 
          data={list}
          horizontal={true}
          renderItem={({item}) => (
            <ItemCards
            title={item.location}
            text1={'Since ' + item.from}
            text2=""
            btnAction={handleCheckout}
            btnIcon="sign-out-alt"
            btnlabel="Check-out"
            itemid={item.id}
          />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
          
        </>
      ) : (<Center><Text>No active workspace checkins</Text></Center>)
      }
      </Box>
      <Box m={3}
      p={2}
        bg={cc_outer_bg}
        w="95%"
        rounded="10px"
      >
      
      { reserves.length > 0 ? (
        <>
        <Text m={2}>Active seat reservations</Text>
        <FlatList 
          data={reserves}
          horizontal={true}
          renderItem={({item}) => (
            <ItemCards
            title={item.seat}
            text1={item.from + ' to ' + item.to}
            text2={item.location}
            showBtn={false}
            itemid={item.id}
          />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
          
        </>
      ) : (<Center><Text>No active seat reservations</Text></Center>)
      }
      </Box>
      <Center>
      {/* <HStack space={3} alignItems="center"> */}
        <ClickableBox 
          btnText="Reserve Workspace"
          clickAction={() => {
            navigation.navigate('AoSeatAvail');
          }}
          iconClass={FontAwesome5}
          iconName="chair"
        />
        <ClickableBox 
          btnText="Check-in (Scan QR)"
          clickAction={() => {
            navigation.navigate('AoScanQR');
          }}
          iconClass={FontAwesome5}
          iconName="qrcode"
        />
      {/* </HStack>
      <HStack space={3} alignItems="center"> */}
        <ClickableBox 
          btnText="Check-in Location"
          clickAction={() => {
            navigation.navigate('AoCLoc');
          }}
          iconClass={FontAwesome5}
          iconName="map-marker-alt"
        />
        {/* <ClickableBox 
          btnText="Meeting Area Booking"
          clickAction={() => {
            navigation.navigate('AoAreaBook');
          }}
          iconClass={FontAwesome5}
          iconName="list-alt"
        /> */}
      {/* </HStack> */}
      </Center>

      
      
      </ScrollView>
    </ScreenWrapper>
  );
}