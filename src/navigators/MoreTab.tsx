import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAssets } from "expo-asset";
import { Image } from "native-base";
import { Setting } from "screens/general/Setting";
const Stack = createNativeStackNavigator();

export function MoreTab() {
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
    <Stack.Navigator initialRouteName="More" screenOptions={options}>
      <Stack.Screen name="More" component={Setting} />
    </Stack.Navigator>
  );
}
