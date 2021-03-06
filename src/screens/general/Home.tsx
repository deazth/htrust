import React from 'react';
import {
  Center, Button, Spinner, Text, Box
} from 'native-base';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { 
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';
import { selectUserObj, selectIsLoading, selectUserID, selectBaseUrl } from '../../app/userSlice';
import { useSelector } from 'react-redux';

export function Home({ navigation }) {
  const curuser = useSelector(selectUserObj);
  const isloading = useSelector(selectIsLoading);
  const baseurl = useSelector(selectBaseUrl);
  const [nama, setNama] = React.useState(curuser.name);
  


  React.useEffect(() => {
  }, []);

  // let curuser = AsyncStorage.getItem('@userobj');
  if(isloading){
    return (
      <ScreenWrapper>
        <Spinner accessibilityLabel="Loading" />
      </ScreenWrapper>
    );
  } 

  return (
    <ScreenWrapper>
      <PageTitle>Welcome {nama}</PageTitle>
      <Box width="95%">

      <Text>The new trUSt is now live.</Text>
      <Text>More improvement shall be made in the future ^_^</Text>
      </Box>
      
    </ScreenWrapper>
  );
}