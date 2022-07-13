import React, { useEffect } from "react";
import {
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  Center,
  Text,
  Image,
  VStack,
  Input,
  Icon,
  Button,
  KeyboardAvoidingView,
  Checkbox,
  HStack,
} from "native-base";
import Constants from "expo-constants";
import axios from "axios";
import * as Notifications from "expo-notifications";

import logo from "assets/logo.png";
import background from "assets/background.jpg";
import { FontAwesome5 } from "@expo/vector-icons";

const FormTextInput = ({ icon, ...props }) => (
  <Input
    InputLeftElement={
      <Icon
        as={<FontAwesome5 name={icon} />}
        size="md"
        m={2}
        _light={{ color: "#B7B4B4" }}
        _dark={{ color: "#B7B4B4" }}
      />
    }
    _light={{
      placeholderTextColor: "#B7B4B4",
      bg: "white",
      color: "black",
    }}
    _dark={{
      placeholderTextColor: "#B7B4B4",
      bg: "white",
      color: "#f89c33",
    }}
    style={{ width: "100%" }}
    borderColor="#1C04E3"
    {...props}
  />
);

import {
  setUserToken,
  setUserID,
  setUserObj,
  selectTokerr,
  setTokerr,
  selectBaseUrl,
} from "../../app/userSlice";
import { useDispatch, useSelector } from "react-redux";

export function Login() {
  const { version } = Constants.manifest;
  const dispatch = useDispatch();
  const initerr = useSelector(selectTokerr);
  const currurl = useSelector(selectBaseUrl);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRememberMe, setIsRememberMe] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pnid, setPnid] = React.useState("");

  async function GetPushID() {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
      setPnid(token);
      // this.setState({ expoPushToken: token });
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  useEffect(() => {
    GetPushID();
  }, []);

  async function doLogin() {
    setIsSubmitting(true);
    const loginurl = currurl + "UserLogin";

    const inputs = {
      staff_no: username,
      password,
      pnid: Constants.isDevice && pnid != "" ? pnid : undefined,
    };

    axios
      .post(loginurl, inputs)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          dispatch(setTokerr(response.data.msg));
          // setErrmsg(response.data.msg);
          setIsSubmitting(false);
        } else {
          // success login
          console.log("login: success");
          // alert(response.data.data.user.name);
          await SecureStore.setItemAsync(
            "apicoin",
            response.data.data.user.token
          );
          dispatch(setUserToken(response.data.data.user.token));

          await SecureStore.setItemAsync(
            "user_id",
            response.data.data.user.id.toString()
          );
          dispatch(setUserID(response.data.data.user.token));
          await SecureStore.setItemAsync(
            "staff_no",
            response.data.data.user.staff_no
          );
          dispatch(setUserObj(response.data.data.user));
          console.log("login: done setting up data");
        }
      })
      .catch((error) => {
        dispatch(setTokerr(error.message));
        setIsSubmitting(false);
      });
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={background}
      style={{ width: "100%", height: "100%", backgroundColor: "red" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-40}
          h="100%"
        >
          <Center>
            <Text style={{ color: "#1C04E3", fontWeight: "bold" }}>
              Welcome to
            </Text>
            <Image
              alt="logo"
              source={logo}
              resizeMode="contain"
              style={{ width: "40%", height: "30%" }}
            />

            <VStack space={2} w="100%" style={{ paddingHorizontal: 50 }}>
              {!!initerr && (
                <Text style={{ fontSize: 12, color: "red" }}>{initerr}</Text>
              )}
              <FormTextInput
                icon="user"
                placeholder="Username"
                onChangeText={setUsername}
                textContentType="username"
                autoComplete="username"
              />
              <FormTextInput
                icon="lock"
                placeholder="Password"
                textContentType="password"
                onChangeText={setPassword}
                type="password"
                autoComplete="password"
              />
              <HStack space={2}>
                <Checkbox.Group
                  onChange={() => setIsRememberMe(v =>!v)}
                  value={isRememberMe ? ["1"]:[]}
                  accessibilityLabel="choose numbers"
                >
                  <Checkbox borderColor="#1C04E3" value="1" />
                </Checkbox.Group>
                <Text style={{ fontSize: 14 }}>Remember me</Text>
              </HStack>
              <Button
                onPress={doLogin}
                isLoading={isSubmitting}
                isLoadingText="Authenticating"
              >
                Login
              </Button>
            </VStack>
            <Text style={{ fontSize: 12, marginTop: 10 }}>
              Version: {version}
            </Text>
          </Center>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
