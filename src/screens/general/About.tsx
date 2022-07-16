import React from "react";
import { StyleSheet } from "react-native";
import { Text, ScrollView, View, useColorModeValue } from "native-base";
import { header_light, unifi_c1, unifi_c4, unifi_c7 } from "components/styles";
import Constants from "expo-constants";

import { LogoutButton } from "components/LogoutButton";
import { ScreenWrapper } from "../../components/styles";

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
const About: React.FC = () => {
  const color = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue(header_light, unifi_c7);

  return (
    <ScreenWrapper>
      <ScrollView
        h="100%"
        w="100%"
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        <View style={{ backgroundColor, padding: 18 }}>
          <Text style={{ color, fontSize: 16 }}>About</Text>
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
};

export default About;
