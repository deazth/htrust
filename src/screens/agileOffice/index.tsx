import React from "react";
import { RefreshControl } from "react-native";
import { useAssets } from "expo-asset";
import { ScrollView, Image, VStack, useColorModeValue } from "native-base";

import Button from "../../components/Button";
import { ScreenWrapper } from "../../components/styles";

import useAgileOfficeStore from "./useAgileOfficeStore";

const AgileOfficeMain = ({ navigation }) => {
  const [assets] = useAssets([require("assets/menara.jpg")]);
  const { refreshing, loadData } = useAgileOfficeStore();

  React.useEffect(() => {
    loadData();
    const willFocusSubscription = navigation.addListener("focus", loadData);
    return willFocusSubscription;
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={{ padding: 15, marginTop: 30 }}
        w="100%"
        h="100%"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        <VStack space={3}>
          <Image
            alt="logo"
            source={assets?.[0]}
            resizeMode="cover"
            style={{ width: "100%", height: 200 }}
          />

          <Button
            label="Reserve Workspace"
            onPress={() => {
              navigation.navigate("AgileOfficeSeatAvail");
            }}
          />
          <Button
            label="Check-in Workspace"
            onPress={() => navigation.navigate("AgileOfficeScanQR")}
          />
          <Button
            label="Check-in Location"
            onPress={() => navigation.navigate("AgileOfficeCLoc")}
          />
        </VStack>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AgileOfficeMain;
