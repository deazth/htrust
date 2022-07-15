import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Pressable, IPressableProps, Icon } from "native-base";

interface Props extends IPressableProps {
  label: string;
  loading?: boolean;
  iconClass: any;
  iconName: string;
}

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#1C03E3",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
  },
  pressed: {
    backgroundColor: "#00000011",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const RowButton: React.FC<Props> = ({
  label,
  loading,
  onPress,
  iconClass,
  iconName,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setTouched(true)}
      onPressOut={() => setTouched(false)}
      {...props}
      style={styles.root}
    >
      <View style={styles.leftContainer}>
        <Icon color="#1C03E3" as={iconClass} name={iconName} size={5} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Icon
        color="#1C03E3"
        as={iconClass}
        name="chevron-circle-right"
        size={5}
      />
      {touched && <View style={styles.pressed} />}
    </Pressable>
  );
};
export default RowButton;
