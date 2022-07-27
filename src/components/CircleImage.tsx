import React, { useState } from "react";
import { Image } from "native-base";
import { ImageProps } from "react-native";
const CircleImage = ({ source, style }: ImageProps) => {
  const [width, setWidth] = useState(0);
  return (
    <Image
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      alt="circle image"
      source={source}
      style={{
        // width: "100%",
        height: width,
        borderRadius: width / 2,
        resizeMode: "cover",
        ...style,
      }}
    />
  );
};

export default CircleImage;
