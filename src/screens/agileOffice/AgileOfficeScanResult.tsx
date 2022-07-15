import React from "react";
import {
  Center,
  Button,
  View,
  Text,
  Spinner,
  ScrollView,
  Box,
  useColorModeValue,
  FlatList,
} from "native-base";
import axios from "axios";
import * as Location from "expo-location";
import {
  ClickableBox,
  DarkModeToggle,
  ItemCards,
  ScreenWrapper,
  unifi_c6,
  unifi_c7,
} from "../../components/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setTokerr,
  setUserObj,
  selectBaseUrl,
  selectUserToken,
} from "../../app/userSlice";

export function AgileOfficeScanResult({ route, navigation }) {
  const [isLoading, setIsLoad] = React.useState(true);
  const cc_outer_bg = useColorModeValue(unifi_c6, unifi_c7);
  const dispatch = useDispatch();
  const { type, qrcode } = route.params;
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const [eventlist, setEventList] = React.useState([]);
  const [sid, setSid] = React.useState(0);
  const [slabel, setSlabel] = React.useState("");
  const [sstatus, setSstatus] = React.useState("");
  const [stype, setStype] = React.useState("");
  const [locPermission, setLocpermission] = React.useState("not allowed");
  const [loclat, setLoclat] = React.useState(0);
  const [loclong, setLoclong] = React.useState(0);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  const fetchQrState = async () => {
    let endpoint = "";

    if (type == "ao") {
      endpoint = "t/ao/getSeatStatus";
    } else {
      if (type == "event") {
        endpoint = "t/ao/getEventStatus";
      } else {
        alert("invalid QR");
        navigation.goBack();
      }
    }

    const theinput = { code: qrcode };

    console.log(theinput);

    axios
      .post(baseurl + endpoint, theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(qrcode));
        } else {
          console.log(response.data.data.id);
          setSid(response.data.data.id);
          setSlabel(response.data.data.label);
          setSstatus(response.data.data.status);
          setStype(response.data.data.type);
          setEventList(response.data.data.extra);
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
          alert(JSON.stringify(endpoint));
        }

        // navigation.goBack();
        return;
      });

    setIsLoad(false);
  };

  const handleSeatCheckin = (index: number) => {
    const theinput = {
      id: index,
      lat: loclat,
      long: loclong,
    };

    console.log("doSeatCheckin");
    console.log(theinput);

    axios
      .post(baseurl + "t/ao/doSeatCheckin", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(qrcode));
        } else {
          if (response.data.msg == "Success") {
            alert("Check-in Successful. ");
            navigation.navigate("Agile Office");
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

  const handleEventCheckin = (index: number) => {
    const theinput = {
      id: index,
      lat: loclat,
      long: loclong,
    };

    axios
      .post(baseurl + "t/ao/doEventCheckin", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(qrcode));
        } else {
          if (response.data.msg == "Success") {
            alert("Check-in Successful. ");
            navigation.navigate("Agile Office");
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
            alert(
              JSON.stringify("Error: Most likely the seat no longer exist.")
            );
            console.log(error.response);
          }
        } else {
          alert(JSON.stringify(error));
        }

        // navigation.goBack();
        return;
      });
  };

  async function getCurrLoc() {
    if (locPermission !== "granted") {
      // get the permission if not granted yet
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission not granted");
        return;
      }

      setLocpermission(status);
    }

    let location = await Location.getCurrentPositionAsync({});

    setTimeout(() => {
      setLoclat(location.coords.latitude);
      setLoclong(location.coords.longitude);
    }, 500);
  }

  React.useEffect(() => {
    getCurrLoc();
    fetchQrState();
  }, []);

  return (
    <ScreenWrapper>
      {isLoading ? (
        <>
          <Text>Type: {type}</Text>
          <Text>Code: {qrcode}</Text>
          <Spinner accessibilityLabel="Loading" />
        </>
      ) : (
        <>
          <ScrollView w="100%">
            <ItemCards
              title={slabel}
              text1={"Type: " + stype}
              text2={"Status: " + sstatus}
              showBtn={sstatus == "Available" && stype != "event"}
              btnAction={handleSeatCheckin}
              btnIcon="sign-in-alt"
              btnlabel="Check-in"
              itemid={sid}
            />
            {stype != "Seat" && (
              <Box m={3} p={2} bg={cc_outer_bg} w="95%" rounded="10px">
                {eventlist.length > 0 ? (
                  <>
                    <Text m={2}>Check-in to event</Text>
                    <FlatList
                      data={eventlist}
                      horizontal={true}
                      renderItem={({ item }) => (
                        <ItemCards
                          title={item.name}
                          text1={"Organizer: " + item.org}
                          text2={"From " + item.startt + " to " + item.endt}
                          showBtn={sstatus == "Available"}
                          btnAction={handleEventCheckin}
                          btnIcon="sign-in-alt"
                          btnlabel="Check-in"
                          itemid={item.ev_id}
                        />
                      )}
                      keyExtractor={(item) => item.ev_id.toString()}
                    />
                  </>
                ) : (
                  <Text>No event registered here around this time</Text>
                )}
              </Box>
            )}
          </ScrollView>
        </>
      )}

      <DarkModeToggle />
    </ScreenWrapper>
  );
}
