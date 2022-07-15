import { FontAwesome5 } from "@expo/vector-icons";
import { List } from "./types";

export const appDetails = (navigation): List[] => [
  {
    label: "About",
    iconClass: FontAwesome5,
    iconName: "lightbulb",
    onPress: () => navigation.navigate("About"),
  },
  {
    label: "FAQ",
    iconClass: FontAwesome5,
    iconName: "question-circle",
    onPress: () => {
      // TODO: Navigation to FAQ
    },
  },
  {
    label: "Settings",
    iconClass: FontAwesome5,
    iconName: "cog",
    onPress: () => navigation.navigate("Settings"),
  },
];

export const appOverviewDetails = (_navigation): List[] => [
  {
    label: "Terms of Use",
    iconClass: FontAwesome5,
    iconName: "sticky-note",
    onPress: () => {
      // TODO: Navigation to Terms of Use
    },
  },
  {
    label: "Rate this App",
    iconClass: FontAwesome5,
    iconName: "star",
    onPress: () => {
      // TODO: Navigation to Rate this App
    },
  },
  {
    label: "Share this App",
    iconClass: FontAwesome5,
    iconName: "share-alt",
    onPress: () => {
      // TODO: Navigation to Settings
    },
  },
];
