import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Center, Button
} from 'native-base';

import { 
  ClickableBox,
  DarkModeToggle, PageTitle, ScreenWrapper
} from '../../components/styles';

export function TeamMain({ navigation }) {

  return (
    <ScreenWrapper>
      <ClickableBox 
        minWidth="75%"
        btnText="Whereabout"
        clickAction={() => {
          navigation.navigate('Inprogress');
        }}
        iconClass={FontAwesome5}
        iconName="map-marked-alt"
      />
      <ClickableBox 
        minWidth="75%"
        btnText="Work-time Utilization"
        clickAction={() => {
          navigation.navigate('Inprogress');
        }}
        iconClass={FontAwesome5}
        iconName="clock"
      />
      <DarkModeToggle />
    </ScreenWrapper>
  );
}