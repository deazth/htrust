import React from 'react';
import { ChartScreenWrapper, ScreenWrapper } from '../../components/styles';
import {StackedBarChart, YAxis } from 'react-native-svg-charts';
import { Text } from 'native-base';
import { View } from 'react-native';

export function AoSeatAvail() {
  const data = [
    {
      month: new Date(2015, 0, 1),
      apples: 3840,
      bananas: 1920,
      cherries: 960,
      dates: 400,
      oranges: 400,
    },
    {
      month: new Date(2015, 1, 1),
      apples: 1600,
      bananas: 1440,
      cherries: 960,
      dates: 400,
    },
    {
      month: new Date(2015, 2, 1),
      apples: 640,
      bananas: 960,
      cherries: 3640,
      dates: 400,
    },
    {
      month: new Date(2015, 3, 1),
      apples: 3320,
      bananas: 480,
      cherries: 640,
      dates: 400,
    },
  ];

  const colors = ['#7b1111', '#777711', '#ce6dbd', '#1111d6'];
  const keys = ['apples', 'bananas', 'cherries', 'dates'];

  return (
    <ChartScreenWrapper>
      <Text>chart sini</Text>
      <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
                    data={data.map(a => a.month)}
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={4}
                    formatLabel={(value) => value}
                />
      <StackedBarChart
          keys={keys}
          style={{ flex: 1, marginLeft: 16 }}
          colors={colors}
          data={data}
          showGrid={true}
          horizontal={true}
          contentInset={{ top: 30, bottom: 30 }}
      />
      </View>
    </ChartScreenWrapper>
  );

}