import React from "react";
import { ScrollView, Image, VStack } from "native-base";
import Button from "components/Button";
import { useAssets } from "expo-asset";

export function AgileOfficeMain({ navigation }) {
  const [assets] = useAssets([require("assets/menara.jpg")]);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={{ backgroundColor: "#F6F8FC" }}
      w="100%"
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
          onPress={() => navigation.navigate("AgileOfficeSeatAvail")}
        />
        <Button
          label="Check-in (Scan QR)"
          onPress={() => navigation.navigate("AgileOfficeScanQR")}
        />
        <Button
          label="Check-in Location"
          onPress={() => navigation.navigate("AgileOfficeCLoc")}
        />
        {/* <ClickableBox 
          btnText="Meeting Area Booking"
          clickAction={() => {
            navigation.navigate('AgileOfficeAreaBook');
          }}
          iconClass={FontAwesome5}
          iconName="list-alt"
        /> */}
      </VStack>
    </ScrollView>
  );
}
