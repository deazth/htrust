import React, { useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { HStack, Spinner, Text, useColorMode } from "native-base";
import Constants from "expo-constants";

import { PageTitle, ScreenWrapper, TrustLogo } from "../../components/styles";

// import { AuthContext } from '../../components/context';
import { useDispatch, useSelector } from "react-redux";
import {
  doneLoading,
  setTokerr,
  setUserID,
  setUserToken,
  setUserObj,
  selectBaseUrl,
} from "../../app/userSlice";

export const Loading = () => {
  console.log("loading: inside loading");
  const curversion = Constants.manifest.version;

  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const baseurl = useSelector(selectBaseUrl);
  const [loadprogress, setLoadProg] = React.useState("Initializing..");

  async function checkLocalToken() {
    console.log("loading: init baseurl : " + baseurl);
    console.log("loading: fetching token");
    setLoadProg("fetching stored token");
    const stoken = await SecureStore.getItemAsync("apicoin");
    const staff_no = await SecureStore.getItemAsync("staff_no");
    const user_id = await SecureStore.getItemAsync("user_id");
    const color_mode = await SecureStore.getItemAsync("color_mode");

    // alert(staff_no);
    // const  pnid = await SecureStore.getItemAsync("pnid");
    if (stoken) {
      console.log("loading: validating token for " + staff_no);
      console.log("token : " + stoken);
      setLoadProg("validating token");
      if (stoken == "") {
        // alert("token is empty");
        dispatch(setTokerr("blank token"));
      } else {
        console.log("stored color: " + color_mode);
        console.log("current color: " + colorMode);

        if (color_mode) {
          if (colorMode != color_mode) {
            toggleColorMode();
          }
        }

        // validate the token here
        const config = {
          headers: { Authorization: `Bearer ${stoken}` },
        };
        const tokenurl = baseurl + "t/ValidateToken";
        console.log("loading: calling " + tokenurl);
        try {
          axios
            .post(
              tokenurl,
              {
                staff_no: staff_no,
              },
              config
            )
            .then((response) => {
              if (response.data.status_code == 200) {
                console.log("loading: Token validation successful");
                // setLoadProg('Token validated');
                dispatch(setUserID(user_id));
                dispatch(setUserToken(stoken));
                dispatch(setUserObj(response.data.data.user));
              } else {
                console.log("loading: not 200");
                console.log(response);
                dispatch(setTokerr("blank token"));
              }
            })
            .catch((error) => {
              console.log("loading: Session expired");
              console.log(error);
              dispatch(setTokerr("Session expired"));
            });
        } catch (error) {
          alert(JSON.stringify(error));
          console.log(error);
          dispatch(setTokerr("error validating token"));
        }
      }
    } else {
      console.log("loading: no previous token");
      // dispatch(setTokerr("No previous login"));
    }

    setTimeout(() => {
      dispatch(doneLoading());
    }, 1000);
  }

  useEffect(() => {
    checkLocalToken();
  }, []);

  return (
    <ScreenWrapper justifyContent="center">
      <TrustLogo />
      <HStack space={2} marginTop={5} alignItems="center">
        <PageTitle>{loadprogress}</PageTitle>
        <Spinner accessibilityLabel="Loading" />
      </HStack>
      <Text>Version: {curversion}</Text>
    </ScreenWrapper>
  );
};
