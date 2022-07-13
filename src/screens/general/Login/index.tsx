import React, { useEffect } from "react";
import {
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"; 
import {
  Center,
  Text,
  Image,
  VStack, 
  Button,
  KeyboardAvoidingView,
  Checkbox,
  HStack,
} from "native-base";
import Constants from "expo-constants";
 
 
import logo from "assets/logo.png";
import background from "assets/background.jpg"; 

  
import { FormTextInput } from "./components/FormtextInput";
import useLoginStore from "./useLoginStore";

export function Login() {
  const { version } = Constants.manifest;
 
  
 
  const [isRememberMe, setIsRememberMe] = React.useState(false);
 
  const { initerr,isSubmitting, setUsername,setPassword,GetPushID,doLogin} = useLoginStore()

   

  useEffect(() => {
    GetPushID();
  }, []);

   

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
