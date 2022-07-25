import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "screens/profile";
import { useOptions } from "./useOptions";

const Stack = createNativeStackNavigator();

export const ProfileTab = () => {
  const options = useOptions();

  return (
    <Stack.Navigator initialRouteName="MoreSetting" screenOptions={options}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
