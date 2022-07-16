import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { Image, useColorModeValue } from "native-base";

import AgileOfficeMain from "screens/agileOffice";
import { AgileOfficeCLoc } from "screens/agileOffice/AgileOfficeCLoc";
import { AgileOfficeScanQR } from "screens/agileOffice/AgileOfficeScanQR";
import { AgileOfficeSeatAvail } from "screens/agileOffice/AgileOfficeSeatAvail";
import { AgileOfficeScanResult } from "screens/agileOffice/AgileOfficeScanResult";
import { AgileOfficeAreaBook } from "screens/agileOffice/AgileOfficeAreaBook";
import { header_light, unifi_c1, unifi_c4, unifi_c7 } from "components/styles";

const Stack = createNativeStackNavigator();

export function AgileOfficeTab() {
  const [assets] = useAssets([require("assets/logo-tm.png")]);

  const headerTintColor = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue(header_light, unifi_c7);
  const options = {
    headerTintColor,
    headerStyle: {
      backgroundColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0,
      shadowRadius: 4.65,
      elevation: 8,
    },
    headerRight: () => (
      <Image
        source={assets?.[0]}
        alt="logo"
        style={{
          resizeMode: "contain",
          width: 50,
          height: 20,
          marginTop: -10,
        }}
      />
    ),
  };

  return (
    <Stack.Navigator initialRouteName="AgileOfficeMain" screenOptions={options}>
      <Stack.Screen
        name="AgileOfficeMain"
        component={AgileOfficeMain}
        options={{ title: "Agile Office" }}
      />
      <Stack.Screen
        name="AgileOfficeCLoc"
        component={AgileOfficeCLoc}
        options={{ title: "Location Update" }}
      />
      <Stack.Screen
        name="AgileOfficeScanQR"
        component={AgileOfficeScanQR}
        options={{ title: "Check-In Workspace" }}
      />
      <Stack.Screen
        name="AgileOfficeSeatAvail"
        component={AgileOfficeSeatAvail}
        options={{ title: "Workspace Reservation" }}
      />
      <Stack.Screen
        name="AgileOfficeScanResult"
        component={AgileOfficeScanResult}
      />
      <Stack.Screen
        name="AgileOfficeAreaBook"
        component={AgileOfficeAreaBook}
      />
    </Stack.Navigator>
  );
}
