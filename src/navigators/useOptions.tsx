import React from "react";
import { header_light, unifi_c1, unifi_c4, unifi_c7 } from "components/styles";
import { useAssets } from "expo-asset";
import { Image, useColorModeValue } from "native-base";

export const useOptions = () => {
  const [assets] = useAssets([require("assets/logo-tm.png")]);
  const headerTintColor = useColorModeValue(unifi_c4, unifi_c1);
  const backgroundColor = useColorModeValue(header_light, unifi_c7);
  return {
    headerTintColor,
    headerStyle: {
      backgroundColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0,
      shadowRadius: 4.65,
      elevation: 8,
    },
    headerRight: () => (
      <Image
        source={assets?.[0]}
        alt="logo"
        style={{
          resizeMode: "contain",
          width: 50,
          height: 20,
          marginTop: -10,
        }}
      />
    ),
  };
};
