import React from 'react';
import {
  Center, Button
} from 'native-base';

import { 
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';

export function DiaryMain({ navigation }) {

  return (
    <ScreenWrapper>
      <PageTitle>Diary Main</PageTitle>
      <Button onPress={() => { navigation.navigate('Login') }}>back to login</Button>
      <DarkModeToggle />
    </ScreenWrapper>
  );
}