import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Button,
  Text,
  useColorModeValue,
  Icon,
  VStack,
} from "native-base";

import { ScreenWrapper, unifi_c4, unifi_c1 } from "components/styles";
import { StyleSheet } from "react-native";

export const Profile = ({ navigation }) => {
  const highlightColor = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue("white", "black");

  return (
    <ScreenWrapper>
      <View style={{ ...styles.box, backgroundColor }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.profileImage} />
          <Text style={{ color: highlightColor, flex: 5 }}>
            Telekom Malaysia Berhad
          </Text>
        </View>
      </View>
      <VStack space={2} style={{ ...styles.box, backgroundColor }}>
        <View style={styles.row}>
          <Text style={{ color: highlightColor }}>Skillsets</Text>
          <Icon
            color={highlightColor}
            as={FontAwesome5}
            name="plus-circle"
            size={4}
          />
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: "#ddd" }} />
        <View style={styles.row}>
          <Text>Skillsets</Text>
          <Icon color={highlightColor} as={FontAwesome5} name="edit" size={4} />
        </View>
      </VStack>
      <VStack space={2} style={{ ...styles.box, backgroundColor }}>
        <View style={styles.row}>
          <Text style={{ color: highlightColor }}>Direct Supervisor</Text>
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: "#ddd" }} />
      </VStack>
      <VStack space={2} style={{ ...styles.box, backgroundColor }}>
        <View style={styles.row}>
          <Text style={{ color: highlightColor }}>Subordinate</Text>
          <Icon
            color={highlightColor}
            as={FontAwesome5}
            name="chevron-circle-right"
            size={4}
          />
        </View>
        <View style={{ width: "100%", height: 1, backgroundColor: "#ddd" }} />
      </VStack>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "gray",
    height: 80,
    width: 80,
    borderRadius: "50%",
  },
});
