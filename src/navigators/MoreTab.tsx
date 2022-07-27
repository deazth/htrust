import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { About, More, Setting } from "screens/general";
import { useOptions } from "./useOptions";

const Stack = createNativeStackNavigator();

export const MoreTab = () => {
  const options = useOptions();

  return (
    <Stack.Navigator initialRouteName="MoreSetting" screenOptions={options}>
      <Stack.Screen
        name="MoreSetting"
        component={More}
        options={{ title: "More", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{ headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};
