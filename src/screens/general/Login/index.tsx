import React, { useEffect, useState } from "react";
import {
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import {
  Center,
  Text,
  Image,
  VStack,
  KeyboardAvoidingView,
  Checkbox,
  HStack,
} from "native-base";
import Constants from "expo-constants";
import { useAssets } from "expo-asset";
import Button from "components/Button";

import FormTextInput from "./components/FormtextInput";
import useLoginStore from "./useLoginStore";

const Login: React.FC = () => {
  const { version } = Constants.manifest;

  const {
    initerr,
    isSubmitting,
    setUsername,
    setPassword,
    GetPushID,
    doLogin,
  } = useLoginStore();

  //TODO: image error handling
  const [assets, _error] = useAssets([
    require("assets/logo.png"),
    require("assets/background.jpg"),
    require("assets/logo-tm.png"),
  ]);

  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const didShow = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardShown(true)
    );
    const didHide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardShown(false)
    );

    GetPushID();
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  const [isKeyboardShown, setKeyboardShown] = useState<boolean>(false);
  return (
    <ImageBackground
      resizeMode="cover"
      source={assets?.[1]}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-40}
          h="100%"
        >
          <Center
            style={{
              marginTop: isKeyboardShown ? 0 : "20%",
            }}
          >
            <Text style={{ color: "#1C04E3", fontWeight: "bold" }}>
              Welcome to
            </Text>
            <Image
              alt="logo"
              source={assets?.[0]}
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
                  onChange={() => setIsRememberMe((v) => !v)}
                  value={isRememberMe ? ["1"] : []}
                  accessibilityLabel="choose numbers"
                >
                  <Checkbox borderColor="#1C04E3" value="1" />
                </Checkbox.Group>
                <Text style={{ fontSize: 14 }}>Remember me</Text>
              </HStack>
              <Button
                loading={isSubmitting}
                onPress={doLogin}
                label={isSubmitting ? "Authenticating" : "Login"}
              />
            </VStack>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 50,
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 12 }}>powered by</Text>
              <Image
                alt="logo tm"
                source={assets?.[2]}
                style={{ height: 20, width: 60, resizeMode: "contain" }}
              />
            </View>
            <Text style={{ fontSize: 12 }}>Version: {version}</Text>
          </Center>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default Login;
