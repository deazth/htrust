import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { Image } from "native-base";

import AgileOfficeMain from "screens/agileOffice";
import { AgileOfficeCLoc } from "screens/agileOffice/AgileOfficeCLoc";
import { AgileOfficeScanQR } from "screens/agileOffice/AgileOfficeScanQR";
import { AgileOfficeSeatAvail } from "screens/agileOffice/AgileOfficeSeatAvail";
import { AgileOfficeScanResult } from "screens/agileOffice/AgileOfficeScanResult";
import { AgileOfficeAreaBook } from "screens/agileOffice/AgileOfficeAreaBook";

const Stack = createNativeStackNavigator();

export function AgileOfficeTab() {
  const [assets] = useAssets([require("assets/logo-tm.png")]);

  const options = {
    headerTintColor: "#1C03E3",
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
