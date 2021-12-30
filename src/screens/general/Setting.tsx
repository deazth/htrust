import React from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  useToast
} from 'native-base';

import { 
  ClickableBox,
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { setUserToken, setUserID, setUserObj } from '../../app/userSlice';
import { useDispatch } from 'react-redux';


export function Setting({navigation}) {
  const dispatch = useDispatch();

  async function signOut() {
    await SecureStore.deleteItemAsync("apicoin");
    await SecureStore.deleteItemAsync("user_id");
    await SecureStore.deleteItemAsync("staff_no");
    dispatch(setUserToken(null));
    dispatch(setUserID(null));
    dispatch(setUserObj(null));
  }


  return (
    <ScreenWrapper>

      {/* <ClickableBox 
        btnText="Feedback"
        clickAction={() => {
          navigation.navigate('Feedback');
        }}
        iconClass={FontAwesome5}
        iconName="head-side-cough"
      /> */}
      <ClickableBox 
        btnText="Info"
        clickAction={() => {
          navigation.navigate('Info');
        }}
        iconClass={FontAwesome5}
        iconName="info"
      />
      <ClickableBox 
        btnText="Logout"
        clickAction={() => { signOut(); }}
        iconClass={FontAwesome5}
        iconName="sign-out-alt"
      />
      <DarkModeToggle />
      
    </ScreenWrapper>
  );
}