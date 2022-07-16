import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, useColorModeValue, View } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import Login from "../screens/general/Login";
import { Home } from "../screens/general/Home";
import { Feedback } from "../screens/general/Feedback";
import { DiaryMain } from "../screens/diary/DiaryMain";
import { MoreTab } from "./MoreTab";
import { AgileOfficeTab } from "./AgileOfficeTab";
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
  c_white,
  header_light,
} from "../components/styles";
import { Loading } from "../screens/general/Loading";
import { selectIsLoading, selectUserID, selectUserObj } from "../app/userSlice";
import { useSelector } from "react-redux";
import { TeamMain } from "../screens/team/TeamMain";
import { Inprogress } from "../screens/general/Inprogress";
import { DiaryEdit } from "../screens/diary/DiaryEdit";
import { useAssets } from "expo-asset";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function RootTab() {
  const iconFocusCol = useColorModeValue("#1C03E3", unifi_primary);
  const iconNormalCol = useColorModeValue("#C7C7C7", unifi_c5);
  const backgroundColor = useColorModeValue(c_white, unifi_c8);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let name;

          const color = focused ? iconFocusCol : iconNormalCol;

          if (route.name === "Home") name = "home";
          else if (route.name === "Agile Office") name = "map-marked-alt";
          else if (route.name === "Diary") name = "book";
          else if (route.name === "More") name = "info-circle";
          else if (route.name === "Profile") name = "user-circle";

          // You can return any component that you like here!
          return <FontAwesome5 {...{ name, size, color }} />;
        },
        tabBarActiveTintColor: iconFocusCol,
        tabBarInactiveTintColor: iconNormalCol,
        tabBarBackground: () => (
          <View style={{ backgroundColor, height: "100%", width: "100%" }} />
        ),
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
        component={AgileOfficeTab}
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
      <Tab.Screen
        name="Profile"
        component={TeamMain}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreTab}
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

  if (isloading) {
    return (
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  if (userid) {
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
  }
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
