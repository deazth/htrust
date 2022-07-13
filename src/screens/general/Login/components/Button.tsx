import React, { useRef } from "react";
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Root = Animated.createAnimatedComponent(Pressable);

export default ({ label, loading, onPress, ...props }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scale = (toValue) =>
    Animated.spring(scaleAnim, { toValue, useNativeDriver: true }).start();
  return (
    <Root
      onPress={() => !loading && onPress()}
      onPressIn={() => scale(0.97)}
      onPressOut={() => scale(1)}
      {...props}
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <LinearGradient
        colors={["#3B6EC9", "#1C04E3"]}
        style={{ borderRadius: 5, padding: 12 }}
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
      </LinearGradient>
    </Root>
  );
};
