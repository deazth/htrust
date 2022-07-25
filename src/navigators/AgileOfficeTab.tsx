import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgileOfficeMain from "screens/agileOffice";
import { AgileOfficeCLoc } from "screens/agileOffice/AgileOfficeCLoc";
import { AgileOfficeScanQR } from "screens/agileOffice/AgileOfficeScanQR";
import { AgileOfficeWorkspaceReservation } from "screens/agileOffice/screens/AgileOfficeWorkspaceReservation";
import { AgileOfficeWorkspaceReservationSearchResult } from "screens/agileOffice/screens/AgileOfficeWorkspaceReservationSearchResult";
import { AgileOfficeScanResult } from "screens/agileOffice/AgileOfficeScanResult";
import { AgileOfficeAreaBook } from "screens/agileOffice/AgileOfficeAreaBook";
import { useOptions } from "./useOptions";

const Stack = createNativeStackNavigator();
export type AgileOfficeTabStackParamList = {
  AgileOfficeMain: undefined;
  AgileOfficeWorkspaceReservation: undefined;
  AgileOfficeWorkspaceReservationSearchResult: {};
};
export const AgileOfficeTab = () => {
  const options = useOptions();

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
        name="AgileOfficeWorkspaceReservation"
        component={AgileOfficeWorkspaceReservation}
        options={{ title: "Workspace Reservation" }}
      />
      <Stack.Screen
        name="AgileOfficeWorkspaceReservationSearchResult"
        component={AgileOfficeWorkspaceReservationSearchResult}
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
};
