import React from 'react';
import {
  Platform, Keyboard, TouchableWithoutFeedback, ScrollView ,
  StyleSheet, 
} from 'react-native';
import { 
  Box, Text, VStack, useColorModeValue, Center,
  Image, View, KeyboardAvoidingView, Input, Icon, Button,
  useColorMode, Switch, HStack, StatusBar
 } from 'native-base';
 import { FontAwesome5 } from '@expo/vector-icons';
//  import {  } from '@react-navigation/native';



export const unifi_c1 = '#f89c33';
export const unifi_c2 = '#ec1c24';
export const unifi_c3 = '#a32383';
export const unifi_c4 = '#143e8c';
export const unifi_c5 = '#cccccc';
export const unifi_c6 = '#c4c4c4';
export const unifi_c7 = '#666666';
export const unifi_c8 = '#363636';
export const unifi_primary = '#ff6624';
export const unifi_c9 = '#ffc132';
export const c_black = '#000000';
export const c_white = '#ffffff';

const csstyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export const BaseContainer = ({children}) => {
  return (
    <Box 
      flex={1}
      w="100%"
      _light={{ bg: unifi_c5, }}
      _dark={{ bg: unifi_c8, }}
      safeArea
      p={0}
      // mx='auto'
    >
      <StatusBar backgroundColor={useColorModeValue(unifi_primary, unifi_c4)} />

      {children}

    </Box>
  );
}

export const FormWrapper = ({children, offset=-40}) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      
      // behavior="padding"
      // style={csstyle.container}
      keyboardVerticalOffset={offset}
      _light={{ bg: unifi_c5, }}
      _dark={{ bg: unifi_c8, }}
      h="100%"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>{children}</ScrollView>
      
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

export const ClickableBox = ({btnText, clickAction, iconClass, iconName, minWidth = "50%", ...props}) => {

  return (
    <Button 
      onPress={clickAction}
      variant={useColorModeValue("solid", "outline")}
      backgroundColor={useColorModeValue(unifi_primary, "transparent")}
      colorScheme={useColorModeValue("orange", "orange")}
      
      minWidth={minWidth}
      m={2}
      startIcon={<Icon as={iconClass} name={iconName} size={5} />}
      {...props}
    >
      {btnText}
    </Button>
  );
}

export const ScreenWrapper = ({children}) => {
  return (
    <Box 
      flex={1} w="100%" h="100%"
      _light={{ bg: unifi_c5, }}
      _dark={{ bg: unifi_c8, }}
      // alignItems="center"
      justifyContent="center"
      // mx='auto'
    >
      <Center>{children}</Center>
    </Box>
  );
}

export const ChartScreenWrapper = ({children}) => {
  return (
    <Box 
      flex={1} w="100%" h="100%"
      _light={{ bg: unifi_c5, }}
      _dark={{ bg: unifi_c8, }}
    >
      {children}
    </Box>
  );
}

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <View style={csstyle.bottomContainer} marginTop="20px">
      <HStack space={3} alignItems="center">
      <FontAwesome5 
        color={ useColorModeValue(c_black, unifi_c9)}
        name="sun"  
      />
      <Switch
        ml="auto"
        onToggle={toggleColorMode}
        isChecked={colorMode === 'dark'}
      />
      <FontAwesome5 name="moon" 
        color={ useColorModeValue(c_black, unifi_c9)}
      />
      </HStack>
          
    
    </View>
  );
}

export const PageTitle = ({children}) => {
  return (
    <VStack space={2} alignItems="center">
      <Text bold color={ useColorModeValue(unifi_c4, unifi_c1)}>{children}</Text>
    </VStack>
  );
}

export const TrustLogo = () => {
  return (
    <Center 
      w="70%"
      bgColor={c_white}
      borderRadius="50px"
      marginTop="50px"
    >
      <Image 
        source={require('../../assets/splash.png')} 
        alt="TrustLogo.png"
        resizeMode="cover"
        width="250px"
        height="250px"
      />

    </Center>
  );
}

export const FormContainer = ({children, baseHeight, ...props}) => {
  return (
    <View
      w="95%"
      marginTop="15px"
      borderRadius="5px"
      h={{
        base: baseHeight,
        lg: "auto"
      }}
      _light={{
        bg: unifi_c4,
      }}
      _dark={{
        bg: unifi_c1,
      }}
      {...props}
    >
      {children}
    </View>
  );
}

export const FormBtnSubmit = ({children, ...props}) => {

  return (
    <Button
      _light={{
        color: unifi_c4,
        bg: unifi_primary,
      }}
      _dark={{
        color: unifi_primary,
        bg: unifi_c4,
      }}
      {...props}
    >{children}</Button>
  );
}

export const FormTextInput = ({icon, placeholder, ...props}) => {
  return (
    <Box w="100%" >
    <Input
      InputLeftElement={
        <Icon
          as={<FontAwesome5 name={icon} />}
          size="md"
          m={2}
          _light={{
            color: unifi_c3,
          }}
          _dark={{
            color: unifi_primary,
          }}
        />
      }
      placeholder={placeholder}
      _light={{
        placeholderTextColor: unifi_c3,
        bg: "#cccccc",
        color: unifi_c4
      }}
      _dark={{
        placeholderTextColor: unifi_c7,
        bg: "#363636",
        color: "#f89c33"
      }}
      {...props}
    />
  </Box>
  );
  
}

