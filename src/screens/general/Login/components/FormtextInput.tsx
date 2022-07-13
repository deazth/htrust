import React  from "react";
import {  Input,  Icon, } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

export const FormTextInput = ({ icon, ...props }) => (
    <Input
      InputLeftElement={
        <Icon
          as={<FontAwesome5 name={icon} />}
          size="md"
          m={2}
          _light={{ color: "#B7B4B4" }}
          _dark={{ color: "#B7B4B4" }}
        />
      }
      _light={{
        placeholderTextColor: "#B7B4B4",
        bg: "white",
        color: "black",
      }}
      _dark={{
        placeholderTextColor: "#B7B4B4",
        bg: "white",
        color: "#f89c33",
      }}
      style={{ width: "100%" }}
      borderColor="#1C04E3"
      {...props}
    />
  );