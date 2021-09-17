import React from 'react';
import {
  Center, Button
} from 'native-base';

import { 
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';

export function Inprogress({ navigation }) {


  return (
    <ScreenWrapper>
      <PageTitle>In queue for development</PageTitle>
    </ScreenWrapper>
  );
}