import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  HStack,
  ScrollView,
} from "native-base";

import { ScreenWrapper, unifi_c4, unifi_c1 } from "components/styles";
import CircleImage from "components/CircleImage";
import { StyleSheet } from "react-native";

const data = {
  name: "Maimunah Binti Hasan",
  id: "TM12345",
  image: "https://picsum.photos/200",
  designation: "Asst Manager Application UI Designer",
  email: "maimunah@tm.com.my",
  phone: "0123456789",
  skillsets: [
    { name: "Microsoft Powerpoint" },
    { name: "Microsoft Word" },
    { name: "Microsoft Vision" },
    { name: "Adobe Softwares" },
  ],
  supervisor: {
    name: "Ahmad Ali bin Muhammad",
    designation: "AGM Revenue Application",
    image: "https://picsum.photos/150",
  },
  subordinates: [
    {
      name: "Abu bin Maslam",
      designation: "Asst Manager Revenue Application",
      image: "https://picsum.photos/170",
    },
  ],
};

export const Profile = ({ navigation }) => {
  const highlightColor = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue("white", "black");
  const RowIcon = ({ name }: { name: string }) => (
    <Icon color={highlightColor} as={FontAwesome5} name={name} size={4} />
  );
  const Border = () => (
    <View style={{ width: "100%", height: 1, backgroundColor: "#ddd" }} />
  );
  const Row = ({ icon, label }: { icon: string; label: string }) => (
    <HStack space={2} style={{ alignItems: "center" }}>
      <RowIcon name={icon} />
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </HStack>
  );

  return (
    <ScreenWrapper>
      <ScrollView w="100%">
        <View style={{ ...styles.box, backgroundColor }}>
          <HStack space={2}>
            <CircleImage
              source={{ uri: data.image }}
              style={{ ...styles.profileImage, flex: 1 }}
            />
            <VStack space={2} style={{ flex: 5 }}>
              <View>
                <Text style={{ fontSize: 16, color: highlightColor }}>
                  {data.name}
                </Text>
                <Text style={{ fontSize: 12 }}>{data.id}</Text>
              </View>
              <Row icon="user-tie" label={data.designation} />
              <Row icon="mail-bulk" label={data.email} />
              <Row icon="mobile-alt" label={data.phone} />
              <Text style={{ fontSize: 12, color: highlightColor }}>
                Telekom Malaysia Berhad
              </Text>
            </VStack>
          </HStack>
        </View>
        <VStack space={2} style={{ ...styles.box, backgroundColor }}>
          <View style={styles.row}>
            <Text style={{ color: highlightColor, fontSize: 16 }}>
              Skillsets
            </Text>
            <RowIcon name="plus-circle" />
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "#ddd" }} />
          {data.skillsets.map((s) => (
            <View style={styles.row}>
              <Text style={{ fontSize: 14 }}>{s.name}</Text>
              <RowIcon name="edit" />
            </View>
          ))}
        </VStack>
        <VStack space={2} style={{ ...styles.box, backgroundColor }}>
          <View style={styles.row}>
            <Text style={{ color: highlightColor, fontSize: 16 }}>
              Direct Supervisor
            </Text>
          </View>
          <Border />
          <HStack space={2}>
            <CircleImage
              source={{ uri: data.supervisor.image }}
              style={{ ...styles.profileImage, flex: 1 }}
            />
            <VStack space={2} style={{ flex: 5 }}>
              <Text style={{ fontSize: 16, color: highlightColor }}>
                {data.supervisor.name}
              </Text>
              <Row icon="user-tie" label={data.supervisor.designation} />
            </VStack>
          </HStack>
        </VStack>
        <VStack space={2} style={{ ...styles.box, backgroundColor }}>
          <View style={styles.row}>
            <Text style={{ color: highlightColor, fontSize: 16 }}>
              Subordinate
            </Text>
            <RowIcon name="chevron-circle-right" />
          </View>
          <Border />
          {data.subordinates.map((s) => (
            <HStack space={2}>
              <CircleImage
                source={{ uri: s.image }}
                style={{ ...styles.profileImage, flex: 1 }}
              />
              <VStack space={2} style={{ flex: 5 }}>
                <Text style={{ fontSize: 16, color: highlightColor }}>
                  {s.name}
                </Text>
                <Row icon="user-tie" label={s.designation} />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
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
      height: 0.2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
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
  },
});
