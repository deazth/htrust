import React from "react";
import { Center, Text, ScrollView, View } from "native-base";
import Constants from "expo-constants";

import {
  DarkModeToggle,
  PageTitle,
  ScreenWrapper,
} from "../../components/styles";
import { StyleSheet } from "react-native";
import { LogoutButton } from "components/LogoutButton";

const styles = StyleSheet.create({
  copyright: {
    color: "#707070",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  line: {
    backgroundColor: "#C7C7C7",
    height: 1,
    marginVertical: 15,
    marginHorizontal: -5,
  },
});

const { version } = Constants.manifest;
export function About({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        h="100%"
        w="100%"
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        <View style={{ backgroundColor: "white", padding: 18 }}>
          <Text style={{ color: "#1C03E3", fontSize: 16 }}>About</Text>
          <View style={styles.line} />
          <Text style={{ color: "#464646", fontSize: 14 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod
          </Text>
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
