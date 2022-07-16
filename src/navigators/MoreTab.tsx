import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { header_light, unifi_c1, unifi_c4, unifi_c7 } from "components/styles";
import { useAssets } from "expo-asset";
import { Image, useColorModeValue } from "native-base";

import { About, More, Setting } from "screens/general";

const Stack = createNativeStackNavigator();

export function MoreTab() {
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
    <Stack.Navigator initialRouteName="MoreSetting" screenOptions={options}>
      <Stack.Screen
        name="MoreSetting"
        component={More}
        options={{ title: "More" }}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Settings" component={Setting} />
    </Stack.Navigator>
  );
}
