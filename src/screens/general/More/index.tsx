import React from "react";
import { ScrollView, Text, View } from "native-base";
import Constants from "expo-constants";

import { FontAwesome5 } from "@expo/vector-icons";
import { ScreenWrapper } from "components/styles";
import { LogoutButton } from "components/LogoutButton";
import RowButton from "./RowButton";
import { StyleSheet } from "react-native";

const { version } = Constants.manifest;

const styles = StyleSheet.create({
  copyright: {
    color: "#707070",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
export function More({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        h="100%"
        w="100%"
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        {[
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
            onPress: () => navigation.navigate("TODO"),
          },
          {
            label: "Settings",
            iconClass: FontAwesome5,
            iconName: "cog",
            onPress: () => navigation.navigate("TODO"),
          },
        ].map((i) => (
          <RowButton {...i} />
        ))}
        <View style={{ margin: 20 }} />
        {[
          {
            label: "Terms of Use",
            iconClass: FontAwesome5,
            iconName: "sticky-note",
            onPress: () => navigation.navigate("TODO"),
          },
          {
            label: "Rate this App",
            iconClass: FontAwesome5,
            iconName: "star",
            onPress: () => navigation.navigate("TODO"),
          },
          {
            label: "Settings",
            iconClass: FontAwesome5,
            iconName: "share-alt",
            onPress: () => navigation.navigate("TODO"),
          },
        ].map((i) => (
          <RowButton {...i} />
        ))}
        <View style={{ padding: 20, marginTop: 40 }}>
          <Text style={{ color: "#1C03E3", fontSize: 14, textAlign: "center" }}>
            Version {version}
          </Text>
          <Text style={styles.copyright}>
            Copyright 2022 Telekom Malaysia Berhad. All rights reserved.
          </Text>
          <LogoutButton />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
