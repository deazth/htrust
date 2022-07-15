import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, useColorModeValue } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import Login from "../screens/general/Login";
import { Home } from "../screens/general/Home";
import { Setting } from "../screens/general/Setting";
import { Feedback } from "../screens/general/Feedback";
import { AgileOfficeMain } from "../screens/agileOffice/AgileOfficeMain";
import { DiaryMain } from "../screens/diary/DiaryMain";
import {
  unifi_c1,
  unifi_c4,
  unifi_c7,
  unifi_c8,
  unifi_c9,
  unifi_primary,
  unifi_c2,
  unifi_c5,
  c_black,
  unifi_c6,
} from "../components/styles";
import { Loading } from "../screens/general/Loading";
import { Info } from "../screens/general/Info";
import { AgileOfficeCLoc } from "../screens/agileOffice/AgileOfficeCLoc";
import { selectIsLoading, selectUserID, selectUserObj } from "../app/userSlice";
import { useSelector } from "react-redux";
import { TeamMain } from "../screens/team/TeamMain";
import { AgileOfficeScanQR } from "../screens/agileOffice/AgileOfficeScanQR";
import { AgileOfficeSeatAvail } from "../screens/agileOffice/AgileOfficeSeatAvail";
import { Inprogress } from "../screens/general/Inprogress";
import { AgileOfficeScanResult } from "../screens/agileOffice/AgileOfficeScanResult";
import { AgileOfficeAreaBook } from "../screens/agileOffice/AgileOfficeAreaBook";
import { DiaryEdit } from "../screens/diary/DiaryEdit";
import { useAssets } from "expo-asset";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function RootTab() {
  const iconFocusCol = useColorModeValue("#1C03E3", unifi_primary);
  const iconNormalCol = useColorModeValue("#C7C7C7", unifi_c5);

  const [assets] = useAssets([require("assets/logo-tm.png")]);

  const options = {
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let name;

          const color = focused ? iconFocusCol : iconNormalCol;

          if (route.name === "Home") name = "home";
          else if (route.name === "Agile Office") name = "map-marked-alt";
          else if (route.name === "Diary") name = "edit";
          else if (route.name === "Misc") name = "info-circle";
          else if (route.name === "Team") name = "users";

          // You can return any component that you like here!
          return <FontAwesome5 {...{ name, size, color }} />;
        },
        tabBarActiveTintColor: iconFocusCol,
        tabBarInactiveTintColor: iconNormalCol,
        // tabBarActiveBackgroundColor: useColorModeValue(unifi_c6, c_black),
        // tabBarInactiveBackgroundColor: useColorModeValue(unifi_c5, unifi_c8),
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Agile Office"
        component={AgileOfficeMain}
        options={options}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryMain}
        options={{
          headerShown: false,
        }}
      />
      {/* <Tab.Screen name="Team" component={TeamMain} 
        options={{
					headerShown: false,
				}}
      /> */}
      <Tab.Screen
        name="Misc"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootStack() {
  const isloading = useSelector(selectIsLoading);
  const userid = useSelector(selectUserObj);
  const headerTint = useColorModeValue(unifi_c4, unifi_c1);
  const headerbgc = useColorModeValue(unifi_c1, unifi_c7);

  const [assets] = useAssets([require("assets/logo-tm.png")]);

  const options = {
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

  // show loading screen if still not ready
  if (isloading) {
    console.log("showing loading screen");
    return (
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    console.log("loading status is done");
    if (userid) {
      console.log("showing content screen");
      return (
        <Stack.Navigator initialRouteName="Hometab">
          <Stack.Screen
            name="Hometab"
            component={RootTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{
              title: "Maklumat",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AgileOfficeCLoc"
            component={AgileOfficeCLoc}
            options={{
              title: "Location Update",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AgileOfficeScanQR"
            component={AgileOfficeScanQR}
            options={{
              title: "Workspace Checkin - QR",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AgileOfficeSeatAvail"
            component={AgileOfficeSeatAvail}
            options={{
              title: "Workspace Reservation",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AgileOfficeAreaBook"
            component={AgileOfficeAreaBook}
            options={{
              ...options,
              title: "Meeting Area Booking",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />

          <Stack.Screen
            name="AgileOfficeScanResult"
            component={AgileOfficeScanResult}
            options={{
              title: "QR Result",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />

          <Stack.Screen
            name="Inprogress"
            component={Inprogress}
            options={{
              title: "Under Development",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="DiaryCrud"
            component={DiaryEdit}
            options={{
              title: "Diary Entry",
              ...options,
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
        </Stack.Navigator>
      );
    } else {
      console.log("no active user. showing login screen");
      return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
  }
}
