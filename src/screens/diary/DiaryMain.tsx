import React from 'react';
import {
  Center, Button, Text
} from 'native-base';
import {Calendar} from 'react-native-calendars';

import { 
  DarkModeToggle, InfoBox, PageTitle, ScreenWrapper
} from '../../components/styles';

export function DiaryMain({ navigation }) {

  const [textdisp, setTextdisp] = React.useState('Please select a date');

  const sampledata = [
    {
      id: 5,
      title: 'Kerja 1',
      details: 'text yg agak panjang',
      tag_desc: 'Project',
      type_desc: 'meeting',
      hours_spent: 5
    },
    {
      id: 6,
      title: 'tidur 2',
      details: 'text yg agak panjang dams damns danmw amsnd w,a sda\ndnams nd,amwnd ,amsne',
      tag_desc: 'Project',
      type_desc: 'bincang',
      hours_spent: 5
    }
  ];


  return (
    <ScreenWrapper>
      <Calendar 
        markedDates={{
          '2021-09-03': {selected: true, marked: true, selectedColor: 'blue'},
          '2021-09-07': {marked: true},
          '2021-09-13': {marked: true, dotColor: 'red', activeOpacity: 0},
          '2021-09-17': {disabled: true, disableTouchEvent: true}
        }}
        onDayPress={(dateobj) => { setTextdisp(dateobj.dateString) }}
      />
      <InfoBox m={3}>
        <Text>{textdisp}</Text>
      </InfoBox>
      <DarkModeToggle />
    </ScreenWrapper>
  );
}