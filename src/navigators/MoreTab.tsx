import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { Image } from "native-base";

import { About, More, Setting } from "screens/general";

const Stack = createNativeStackNavigator();

export function MoreTab() {
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
    <Stack.Navigator initialRouteName="MoreSetting" screenOptions={options}>
      <Stack.Screen name="MoreSetting" component={More} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}
