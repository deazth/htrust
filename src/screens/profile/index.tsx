import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Button, Text, useColorModeValue } from "native-base";

import { ScreenWrapper, unifi_c4, unifi_c1 } from "components/styles";
import { StyleSheet } from "react-native";

export const Profile = ({ navigation }) => {
  const highlightColor = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue("white", "black");

  return (
    <ScreenWrapper>
      <View style={{ ...styles.box, backgroundColor }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              borderColor: "white",
              borderWidth: 3,
              backgroundColor: "gray",
              height: 80,
              width: 80,
              borderRadius: "50%",
            }}
          />
          <Text style={{ color: highlightColor, flex: 5 }}>
            Telekom Malaysia Berhad
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "100%",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
