import React from "react";
import { Center, Button, Text } from "native-base";
import Constants from "expo-constants";

import {
  DarkModeToggle,
  PageTitle,
  ScreenWrapper,
} from "../../components/styles";

export function Info({ navigation }) {
  const curversion = Constants.manifest.version;

  return (
    <ScreenWrapper justifyContent="center">
      {/* <PageTitle>Maklumat</PageTitle> */}
      <Text>Version: {curversion}</Text>
      <Text>Contact us through IRIS in you're interested to join the team</Text>
    </ScreenWrapper>
  );
}
