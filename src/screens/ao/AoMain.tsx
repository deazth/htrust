import React from 'react';
import {
  Center, Button, View, Text, VStack, HStack, IconButton, Icon, ScrollView, Box, useColorModeValue, FlatList
} from 'native-base';

import { 
  ClickableBox,
  DarkModeToggle, FormContainer, PageTitle, ScreenWrapper, unifi_c1, unifi_c4, unifi_c6, unifi_c7, unifi_primary
} from '../../components/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';


export function AoMain({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const cc_outer_bg = useColorModeValue(unifi_c6, unifi_c7);
  const cc_inner_bg = useColorModeValue(unifi_c1, unifi_c4);
  const cc_btn_bg = useColorModeValue(unifi_primary, "transparent");
  const cc_btn_var = useColorModeValue("solid", "outline");

  const curcheckins = [{
    id: 1,
    location: 'meja bulat',
    from: '2021-03-01 23:22:11'
  }, {
    id: 3,
    location: 'Meeting yang agak panjang',
    from: '2021-03-01 23:22:11'
  }, {
    id: 5,
    location: 'alamat rumah',
    from: '2021-03-01 23:22:11'
  }];

  const [list, setList] = React.useState([]);

  const handleCheckout = (index: number) => {
    // checkout. pastu maybe pull semula list
  };

  async function loadData() {
    console.log("ao loading");
    setRefreshing(true);
    setList(curcheckins);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    console.log("ao loaded");
    
  }

  React.useEffect(() => {
    loadData();
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
        <Text m={2}>Current checkins</Text>
        <FlatList 
          data={list}
          horizontal={true}
          renderItem={({item}) => (
            <Box p={2} m={2} bg={cc_inner_bg} rounded="10px">
              <Text w="90%">{item.location}</Text>
              <Text fontSize="xs" w="90%">{item.from}</Text>
              <Button mt={2}
                size="xs"
                variant={cc_btn_var}
                endIcon={<Icon as={FontAwesome5} name="sign-out-alt" size={5} />}
                backgroundColor={cc_btn_bg}
                colorScheme="orange"
              >
                Check-out
              </Button>
              
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
          
        </>
      ) : (<Text>No active checkins</Text>)
      }
      </Box>

      <ClickableBox 
        btnText="Check-in Workspace"
        clickAction={() => {
          navigation.navigate('AoScanQR');
        }}
        iconClass={FontAwesome5}
        iconName="qrcode"
      />
      <ClickableBox 
        btnText="Seat Availability"
        clickAction={() => {
          navigation.navigate('AoSeatAvail');
        }}
        iconClass={FontAwesome5}
        iconName="chair"
      />
      <ClickableBox 
        btnText="Check-in Location"
        clickAction={() => {
          navigation.navigate('AoCLoc');
        }}
        iconClass={FontAwesome5}
        iconName="map-marker-alt"
      />
      <ClickableBox 
        btnText="Location History"
        clickAction={() => {
          navigation.navigate('AoLocHist');
        }}
        iconClass={FontAwesome5}
        iconName="list-alt"
      />
      </ScrollView>
    </ScreenWrapper>
  );
}