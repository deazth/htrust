import React, {useEffect} from 'react';
import {Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  Center, VStack, Text,
} from 'native-base';
import Constants from 'expo-constants';
import axios from 'axios';
import * as Notifications from 'expo-notifications';

import { 
  TrustLogo, FormContainer, FormTextInput, FormBtnSubmit, 
  DarkModeToggle, FormWrapper
} from '../../components/styles';

import { setUserToken, setUserID, setUserObj, selectTokerr, setTokerr, setBaseUrl, selectBaseUrl } from '../../app/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export function Login() {
  const dispatch = useDispatch();
  const initerr = useSelector(selectTokerr);
  const currurl = useSelector(selectBaseUrl);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [errmsg, setErrmsg] = React.useState(initerr);
  const [pnid, setPnid] = React.useState('');

  async function GetPushID() {

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
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

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
  }

  useEffect(() => {
    GetPushID();
  }, []);

  async function doLogin() {
    setIsSubmitting(true);
    // alert(JSON.stringify({username, password}));
    // console.log("login: submitting - " + JSON.stringify({username, password}));
    const loginurl = currurl + 'UserLogin';
    console.log("login url: " + loginurl);
    
    var inputs;

    if(Constants.isDevice && pnid != ''){
      inputs = {
        staff_no: username,
        password: password,
        pnid: pnid
      };
    } else {
      inputs = {
        staff_no: username,
        password: password
      };
    }
    
    console.log(inputs);

    axios.post(
      loginurl, inputs
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        dispatch(setTokerr(response.data.msg));
        // setErrmsg(response.data.msg);
        setIsSubmitting(false);
      } else {
        // success login
        console.log("login: success");
        // alert(response.data.data.user.name);
        await SecureStore.setItemAsync("apicoin", response.data.data.user.token);
        dispatch(setUserToken(response.data.data.user.token));
        
        await SecureStore.setItemAsync("user_id", response.data.data.user.id.toString());
        dispatch(setUserID(response.data.data.user.token));
        await SecureStore.setItemAsync("staff_no", response.data.data.user.staff_no);
        dispatch(setUserObj(response.data.data.user));
        console.log("login: done setting up data");

      }
      
    }).catch(error => {
      dispatch(setTokerr(error.message));
      alert(JSON.stringify(error));
      setIsSubmitting(false);
    })
    
  }  

  return (
    <FormWrapper>
      <Center>
        <TrustLogo />
    
        <FormContainer baseHeight="210px">
          
          <VStack space={2} m={5}>
            <FormTextInput 
              icon="user"
              placeholder="Username"
              onChangeText={setUsername}
            />
            <FormTextInput 
              icon="lock"
              placeholder="password"
              onChangeText={setPassword}
              type="password"
            />
            <FormBtnSubmit onPress={doLogin} isLoading={isSubmitting} isLoadingText="Authenticating">Login</FormBtnSubmit>
          </VStack>
        </FormContainer>
        { initerr !== null ? <Text m={2}>{initerr}</Text> : '' }    
        <DarkModeToggle />
        
      </Center>
    
    </FormWrapper>
    
  );
}

