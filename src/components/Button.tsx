import React, { useRef } from "react";
import { ActivityIndicator, Animated } from "react-native";
import {
  useColorMode,
  View,
  Text,
  Pressable,
  IPressableProps,
} from "native-base";
import { unifi_primary } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

interface Props extends IPressableProps {
  label: string;
  loading?: boolean;
}

const Root = Animated.createAnimatedComponent(Pressable);

const Button: React.FC<Props> = ({ label, loading, onPress, ...props }) => {
  const { colorMode } = useColorMode();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scale = (toValue) =>
    Animated.spring(scaleAnim, { toValue, useNativeDriver: true }).start();
  return (
    <Root
      onPress={(event) => !loading && onPress(event)}
      onPressIn={() => scale(0.97)}
      onPressOut={() => scale(1)}
      {...props}
      style={{
        transform: [{ scale: scaleAnim }],
        width: "100%",
      }}
    >
      <LinearGradient
        // colors={["#3353CF", "#3C51D6", "#241EDC", "#241EDC"]}
        colors={
          colorMode === "light"
            ? ["#3353CF", "#3C51D6", "#241EDC", "#241EDC"]
            : [unifi_primary, unifi_primary]
        }
        style={{ borderRadius: 5, padding: 3 }}
      >
        <View style={{ borderRadius: 5, padding: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && <ActivityIndicator style={{ marginRight: 5 }} />}
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {label}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Root>
  );
};
export default Button;
