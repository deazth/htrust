import { FontAwesome5 } from "@expo/vector-icons";

export interface List {
  label: string;
  iconClass: typeof FontAwesome5;
  iconName: string;
  onPress: () => void;
}
