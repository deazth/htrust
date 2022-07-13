import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorModeValue } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import Login from "../screens/general/Login";
import { Home } from "../screens/general/Home";
import { Setting } from "../screens/general/Setting";
import { Feedback } from "../screens/general/Feedback";
import { AoMain } from "../screens/ao/AoMain";
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
import { AoCLoc } from "../screens/ao/AoCLoc";
import { selectIsLoading, selectUserID, selectUserObj } from "../app/userSlice";
import { useSelector } from "react-redux";
import { TeamMain } from "../screens/team/TeamMain";
import { AoScanQR } from "../screens/ao/AoScanQR";
import { AoSeatAvail } from "../screens/ao/AoSeatAvail";
import { Inprogress } from "../screens/general/Inprogress";
import { AoScanResult } from "../screens/ao/AoScanResult";
import { AoAreaBook } from "../screens/ao/AoAreaBook";
import { DiaryEdit } from "../screens/diary/DiaryEdit";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function RootTab() {
  let iconFocusCol = useColorModeValue(unifi_c4, unifi_primary);
  let iconNormalCol = useColorModeValue(c_black, unifi_c5);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          var iconcolorr = focused ? iconFocusCol : iconNormalCol;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Agile Office") {
            iconName = "map-marked-alt";
          } else if (route.name === "Diary") {
            iconName = "edit";
          } else if (route.name === "Misc") {
            iconName = "info-circle";
          } else if (route.name === "Team") {
            iconName = "users";
          }

          // You can return any component that you like here!
          return (
            <FontAwesome5 name={iconName} size={size} color={iconcolorr} />
          );
        },
        tabBarActiveTintColor: iconFocusCol,
        tabBarInactiveTintColor: iconNormalCol,
        tabBarActiveBackgroundColor: useColorModeValue(unifi_c6, c_black),
        tabBarInactiveBackgroundColor: useColorModeValue(unifi_c5, unifi_c8),
      })}
    >
      {/* <Tab.Screen name="Home" component={Home}  
        options={{
					headerShown: false,
				}}
      /> */}
      <Tab.Screen
        name="Agile Office"
        component={AoMain}
        options={{
          headerShown: false,
        }}
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
      // console.log(userid);
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
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AoCLoc"
            component={AoCLoc}
            options={{
              title: "Location Update",
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AoScanQR"
            component={AoScanQR}
            options={{
              title: "Workspace Checkin - QR",
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AoSeatAvail"
            component={AoSeatAvail}
            options={{
              title: "Workspace Reservation",
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />
          <Stack.Screen
            name="AoAreaBook"
            component={AoAreaBook}
            options={{
              title: "Meeting Area Booking",
              headerShown: true,
              headerTintColor: headerTint,
              headerStyle: {
                backgroundColor: headerbgc,
              },
            }}
          />

          <Stack.Screen
            name="AoScanResult"
            component={AoScanResult}
            options={{
              title: "QR Result",
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
