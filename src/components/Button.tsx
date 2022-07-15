import React, { useRef } from "react";
import { ActivityIndicator, Animated } from "react-native";
import {
  useColorModeValue,
  View,
  Text,
  Pressable,
  IPressableProps,
} from "native-base";
import { c_white, unifi_c4, unifi_primary } from "./styles";

interface Props extends IPressableProps {
  label: string;
  loading?: boolean;
}

const Root = Animated.createAnimatedComponent(Pressable);

const Button: React.FC<Props> = ({ label, loading, onPress, ...props }) => {
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
      <View
        style={{
          borderRadius: 5,
          padding: 12,
          backgroundColor: useColorModeValue(unifi_c4, unifi_primary),
        }}
      >
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
    </Root>
  );
};
export default Button;
