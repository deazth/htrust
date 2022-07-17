import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { header_light, unifi_c1, unifi_c4, unifi_c7 } from "components/styles";
import { useAssets } from "expo-asset";
import { Image, useColorModeValue } from "native-base";
import { DiaryMain } from "screens/diary/DiaryMain";
import { DiaryEdit } from "screens/diary/DiaryEdit";

const Stack = createNativeStackNavigator();

export function DiaryTab() {
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
    <Stack.Navigator initialRouteName="DiaryMain" screenOptions={options}>
      <Stack.Screen
        name="DiaryMain"
        component={DiaryMain}
        options={{ title: "Diary" }}
      />
      <Stack.Screen
        name="DiaryEdit"
        component={DiaryEdit}
        options={{ title: "Diary" }}
      />
    </Stack.Navigator>
  );
}
