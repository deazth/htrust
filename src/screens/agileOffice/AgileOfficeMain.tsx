import React from "react";
import {
  Center,
  Text,
  ScrollView,
  Box,
  useColorModeValue,
  FlatList,
  Image,
  VStack,
} from "native-base";
import axios from "axios";
import {
  ItemCards,
  ScreenWrapper,
  unifi_c6,
  unifi_c7,
} from "../../components/styles";
import Button from "components/Button";
import { RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setTokerr,
  setUserObj,
  selectBaseUrl,
  selectUserToken,
} from "../../app/userSlice";
import { useAssets } from "expo-asset";

export function AgileOfficeMain({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const [assets] = useAssets([require("assets/menara.jpg")]);

  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);

  const cc_outer_bg = useColorModeValue(unifi_c6, unifi_c7);

  // current check in list
  const [list, setList] = React.useState([]);
  // active reservations
  const [reserves, setReserves] = React.useState([]);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  const handleCheckout = (id: number) => {
    const theinput = { id };

    axios
      .post(baseurl + "t/ao/doCheckout", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            alert("Check-out Successful. ");
            loadData();
          } else {
            alert("Check-in failed. " + response.data.msg);
          }
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
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
    const getckurl = baseurl + "t/ao/getCurrentCheckins";
    const getrsvpurl = baseurl + "t/ao/getCurrentReservations";

    axios
      .post(getckurl, null, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(response.data.msg);
        } else {
          setList(response.data.data.checkins);
          console.log("ck loaded");
          setRefreshing(false);
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      });

    axios
      .post(getrsvpurl, null, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(response.data.msg);
        } else {
          setReserves(response.data.data.checkins);
          console.log("rsvp loaded");
          setRefreshing(false);
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      });
  }

  React.useEffect(() => {
    loadData();

    const willFocusSubscription = navigation.addListener("focus", loadData);

    return willFocusSubscription;
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={{ backgroundColor: "#F6F8FC" }}
      w="100%"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadData} />
      }
    >
      <VStack space={3}>
        <Image
          alt="logo"
          source={assets?.[0]}
          resizeMode="cover"
          style={{ width: "100%", height: 200 }}
        />
        {/* TODO: to check if these boxes are needed since it is not in the design */}
        <Box bg={cc_outer_bg} rounded="10px">
          {list.length > 0 ? (
            <>
              <Text m={2}>Current workspace checkins</Text>
              <FlatList
                data={list}
                horizontal
                renderItem={({ item }) => (
                  <ItemCards
                    title={item.location}
                    text1={"Since " + item.from}
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
          ) : (
            <Center>
              <Text>No active workspace checkins</Text>
            </Center>
          )}
        </Box>
        <Box bg={cc_outer_bg} rounded="10px">
          {reserves.length > 0 ? (
            <>
              <Text m={2}>Active seat reservations</Text>
              <FlatList
                data={reserves}
                horizontal
                renderItem={({ item }) => (
                  <ItemCards
                    title={item.seat}
                    text1={item.from + " to " + item.to}
                    text2={item.location}
                    showBtn={false}
                    itemid={item.id}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </>
          ) : (
            <Center>
              <Text>No active seat reservations</Text>
            </Center>
          )}
        </Box>
        <Button
          label="Reserve Workspace"
          onPress={() => navigation.navigate("AgileOfficeSeatAvail")}
        />
        <Button
          label="Check-in (Scan QR)"
          onPress={() => navigation.navigate("AgileOfficeScanQR")}
        />
        <Button
          label="Check-in Location"
          onPress={() => navigation.navigate("AgileOfficeCLoc")}
        />
        {/* <ClickableBox 
          btnText="Meeting Area Booking"
          clickAction={() => {
            navigation.navigate('AgileOfficeAreaBook');
          }}
          iconClass={FontAwesome5}
          iconName="list-alt"
        /> */}
      </VStack>
    </ScrollView>
  );
}
