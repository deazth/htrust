import React from "react";
import { Text, ScrollView, View, Switch, Icon } from "native-base";
import Constants from "expo-constants";

import { ScreenWrapper } from "components/styles";
import { StyleSheet } from "react-native";
import { LogoutButton } from "components/LogoutButton";
import { FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
  copyright: {
    color: "#707070",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
});
const { version } = Constants.manifest;
export function Setting({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        h="100%"
        w="100%"
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        <View style={{ backgroundColor: "white", padding: 18 }}>
          <Text style={{ color: "#1C03E3", fontSize: 16 }}>Settings</Text>
          {[
            { label: "Dark Mode", iconClass: FontAwesome5, iconName: "adjust" },
            {
              label: "Push Notification",
              iconClass: FontAwesome5,
              iconName: "bell",
            },
            {
              label: "Inbox Notification",
              iconClass: FontAwesome5,
              iconName: "envelope",
            },
          ].map((i) => (
            <View key={i.label} style={styles.row}>
              <View style={{ flexDirection: "row" }}>
                <Icon as={i.iconClass} name={i.iconName} size={5} />
                <Text style={{ marginLeft: 10, fontSize: 15 }}>{i.label}</Text>
              </View>
              <Switch size="sm" offTrackColor="#000" onTrackColor="#1C03E3" />
            </View>
          ))}
        </View>
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
