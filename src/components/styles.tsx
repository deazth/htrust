import React from 'react';
import {
  Platform, Keyboard, TouchableWithoutFeedback, ScrollView ,
  StyleSheet
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

export const BaseContainer = ({children}) => {
  return (
    <Box 
      flex={1}
      w="100%"
      _light={{ bg: c_white, }}
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
      _light={{ bg: c_white, }}
      _dark={{ bg: unifi_c8, }}
      h="100%"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>{children}</ScrollView>
      
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

export const InfoBox = ({children, ...props}) => {

  return (
    <Box 
      w="95%"
      p={2}
      _light={{ bg: unifi_c5, }}
      _dark={{ bg: c_black, }}
      rounded="10px"
      {...props}
    >
      {children}
    </Box>
  );
}

export const ClickableBox = ({btnText, clickAction, iconClass, iconName, minWidth = "45%", iconSize = 5, ...props}) => {

  return (
    <Button 
      onPress={clickAction}
      // variant={useColorModeValue("solid", "outline")}
      backgroundColor={useColorModeValue(unifi_c4, unifi_primary)}
      // colorScheme={useColorModeValue("orange", "orange")}
      
      // minWidth={minWidth}
      width="46%"
      marginX={1}
      marginY={2}
      startIcon={<Icon as={iconClass} name={iconName} size={iconSize}/>}
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
      _light={{ bg: c_white, }}
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
      _light={{ bg: c_white, }}
      _dark={{ bg: unifi_c8, }}
    >
      {children}
    </Box>
  );
}

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center my="5px">
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
          
    
    </Center>
  );
}

export const PageTitle = ({children}) => {
  return (
    <VStack space={2} alignItems="center">
      <Text m={2} bold color={ useColorModeValue(unifi_c4, unifi_c1)}>{children}</Text>
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

export const ItemCards = ({title, text1, text2, showBtn=true, btnlabel = '', btnAction = null, btnIcon = '', itemid = 0}) => {

  const cc_outer_bg = useColorModeValue(unifi_c5, c_black);
  const main_text = useColorModeValue(unifi_primary, unifi_c4);
  const cc_inner_bg = useColorModeValue(unifi_c4, unifi_primary);
  const cc_btn_bg = useColorModeValue(unifi_c4, unifi_primary);
  const cc_btn_var = "outline"; //useColorModeValue("solid", "outline");

  return (
    <Box p={2} m={2} bg={cc_inner_bg} rounded="10px" flexDirection='row'>
      <View flex={showBtn ? 4 : 1} justifyContent="center" maxWidth="230px">
        <Text color={main_text}>{title}</Text>
        <Text fontSize="xs" color={cc_outer_bg} w="95%">{text1}</Text>
        {text2 != '' && (
          <Text fontSize="xs" color={cc_outer_bg} >{text2}</Text>
        )}
        
      </View>
      
      
      {showBtn && (
        <View flex={1}>
          <Button mt={2}
            size="xs"
            variant={cc_btn_var}
            // endIcon={<Icon as={FontAwesome5} name={btnIcon} size={5} />}
            backgroundColor={cc_btn_bg}
            // color={main_text}
            colorScheme="blue"
            onPress={() => btnAction(itemid)}
            p={1}
          >
            <Center flex={1}>
              <Icon color={main_text} as={FontAwesome5} name={btnIcon} size={8} />
              <Text color={main_text}>{btnlabel}</Text> 
            </Center>
          </Button>
        </View>
      )}
      
    </Box>
  );
}

