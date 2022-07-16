import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, useColorModeValue, View } from "native-base";
import Constants from "expo-constants";

import { ScreenWrapper, unifi_c1, unifi_c4 } from "components/styles";
import { LogoutButton } from "components/LogoutButton";
import RowButton from "./components/RowButton";
import { appDetails, appOverviewDetails } from "./constants";

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
  const appDetailLists = appDetails(navigation);
  const appOverviewDetailLists = appOverviewDetails(navigation);
  const color = useColorModeValue(unifi_c4, unifi_c1);
  return (
    <ScreenWrapper>
      <ScrollView
        h="100%"
        w="100%"
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        {appDetailLists.map((detailEntry, index) => (
          <RowButton key={index + `app-detail`} {...detailEntry} />
        ))}

        <View style={{ margin: 20 }} />

        {appOverviewDetailLists.map((detailEntry, index) => (
          <RowButton key={index + `app-overview-detail`} {...detailEntry} />
        ))}

        <View style={{ padding: 20, marginTop: 40 }}>
          <Text style={{ color, fontSize: 14, textAlign: "center" }}>
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
