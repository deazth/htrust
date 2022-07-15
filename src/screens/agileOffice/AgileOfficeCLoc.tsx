import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  setTokerr,
  setUserObj,
  selectBaseUrl,
  selectUserToken,
} from "../../app/userSlice";
import axios from "axios";

import { Center, Button, Box } from "native-base";

import {
  ClickableBox,
  DarkModeToggle,
  PageTitle,
  ScreenWrapper,
} from "../../components/styles";

export function AgileOfficeCLoc({ navigation }) {
  const [locationc, setLocation] = React.useState(null);
  const [lastLoc, setLastloc] = React.useState("Waiting ...");
  const [currAddr, setcuraddr] = React.useState(
    "Waiting for location permission"
  );
  const [lastCoord, setLastcoord] = React.useState(null);
  // const [centerloc, setCenterloc] = React.useState(null);

  const [isClocked, setIsClocked] = React.useState(false);
  // const [errorMsg, setErrorMsg] = React.useState(null);
  const [btnRefLoad, setBtnRefLoad] = React.useState(false);
  const [locPermission, setLocpermission] = React.useState("not allowed");
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const dispatch = useDispatch();

  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  async function getCurrLoc() {
    console.log("entered getCurrLoc");
    setBtnRefLoad(true);
    if (locPermission !== "granted") {
      console.log("permissi not grantned yet");
      // get the permission if not granted yet
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setcuraddr("Permission to access location was denied");
        setBtnRefLoad(false);
        return;
      }

      setLocpermission(status);
    }

    setcuraddr("Location permission granted");

    // setTimeout(() => {

    // }, 500);

    console.log("Getting current coord");

    let location = await Location.getCurrentPositionAsync({});
    console.log("Current coord obtained");

    console.log("saving the coord");
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });

    getLastKnownLoc(location.coords.latitude, location.coords.longitude);

    console.log("translating the coord");
    translateCurrLoc(location.coords.latitude, location.coords.longitude);

    setBtnRefLoad(false);

    setTimeout(() => {}, 500);
  }

  async function translateCurrLoc(lat, long) {
    setcuraddr("Translating current address");
    console.log("fetching addr");
    let inputcoord = {
      latitude: lat,
      longitude: long,
    };
    console.log(locationc);
    axios
      .post(baseurl + "t/loc/CoordToAddr", inputcoord, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert("response not 200");
        } else {
          if (response.data.msg == "Success") {
            console.log("addr fetched");
            setcuraddr(response.data.data);
          } else {
            setcuraddr("Error fetching current address: " + response.data.msg);
          }
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        console.log("addr: hitting error ");
        if (error.response) {
          console.log("addr: got response ");
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log("addr: hitting error ");
            // alert('error not auth');
            setcuraddr("Error translating coord to address");
          }
        } else {
          console.log("addr: no response ");
          setcuraddr("Error translating coord to address");
        }

        // navigation.goBack();
        return;
      });
  }

  async function getLastKnownLoc(curlat, curlong) {
    setLastloc("Fetching last location");
    axios
      .post(baseurl + "t/loc/GetCurrentStatus", [], config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            console.log("loc fetched");
            setLastcoord({
              latitude: parseFloat(response.data.data.lastloc.lat),
              longitude: parseFloat(response.data.data.lastloc.long),
            });
            setLastloc("Last location: " + response.data.data.lastloc.addr);
            setIsClocked(response.data.data.is_clocked);
            console.log("last coord set");

            // console.log("finding middle of the map");
            // // find the middle ground
            // let midlat = (lastCoord.latitude + curlat) / 2;
            // let midlong = (lastCoord.longitude + curlong) / 2;
            // let deltalat = Math.abs(lastCoord.latitude - curlat) * 1.5;
            // let deltalong = Math.abs(lastCoord.longitude - curlong) * 1.5;

            // setCenterloc({
            //   latitude: midlat,
            //   longitude: midlong,
            //   latitudeDelta: deltalat,
            //   longitudeDelta: deltalong,
            // });

            // console.log("middle of the map set");
          } else {
            alert("Error fetching current status: " + response.data.msg);
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
          console.log("error while fetching lastloc");
        }

        // navigation.goBack();
      });
  }

  async function doCheckIn() {
    const inparam = {
      lat: locationc.latitude,
      long: locationc.longitude,
      address: currAddr,
    };
    axios
      .post(baseurl + "t/loc/CheckInCoord", inparam, config)
      .then(async (response) => {
        // check for status code
        alert("Check-in successful");
        navigation.goBack();
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
  }

  async function doCheckOut() {
    const inparam = {
      lat: locationc.latitude,
      long: locationc.longitude,
      address: currAddr,
    };
    axios
      .post(baseurl + "t/loc/CheckOutCoord", inparam, config)
      .then(async (response) => {
        // check for status code
        alert("Check-out successful");
        navigation.goBack();
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
  }

  async function doUpdateLoc() {
    const inparam = {
      lat: locationc.latitude,
      long: locationc.longitude,
      address: currAddr,
    };
    axios
      .post(baseurl + "t/loc/UpdateCoord", inparam, config)
      .then(async (response) => {
        // check for status code
        alert("Location update successful");
        navigation.goBack();
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
  }

  React.useEffect(() => {
    getCurrLoc();
  }, []);

  return (
    <ScreenWrapper>
      <PageTitle>{lastLoc}</PageTitle>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        region={locationc}
      >
        {lastCoord ? (
          <Marker
            coordinate={lastCoord}
            title="You was here"
            description="Last known location of you"
          />
        ) : (
          <></>
        )}
      </MapView>

      <PageTitle>Current location: {currAddr}</PageTitle>

      {isClocked ? (
        <>
          <ClickableBox
            btnText="Update Location"
            clickAction={() => doUpdateLoc()}
            iconClass={MaterialIcons}
            iconName="edit-location"
            isLoading={btnRefLoad}
          />
          <ClickableBox
            btnText="Check-Out"
            clickAction={() => doCheckOut()}
            iconClass={MaterialIcons}
            iconName="wrong-location"
            isLoading={btnRefLoad}
          />
        </>
      ) : (
        <ClickableBox
          btnText="Check-In"
          clickAction={() => doCheckIn()}
          iconClass={MaterialIcons}
          iconName="add-location-alt"
          isLoading={btnRefLoad}
        />
      )}
      <ClickableBox
        btnText="Reset Current Loc"
        clickAction={() => getCurrLoc()}
        iconClass={FontAwesome}
        iconName="refresh"
        isLoading={btnRefLoad}
        minWidth="45%"
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 200,
  },
});
