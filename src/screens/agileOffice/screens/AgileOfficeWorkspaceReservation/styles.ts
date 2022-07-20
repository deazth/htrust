import { unifi_c9 } from "components/styles";
import { useColorModeValue } from "native-base";

const placeholderTextColor = useColorModeValue("#C2C2C2", unifi_c9);
const selectBorderColor = useColorModeValue("#707070", undefined);
const selectBackgroundColor = useColorModeValue("white", "#707070");
export const textColor = useColorModeValue("black", unifi_c9);

export const selectStyle = {
  placeholderTextColor,
  borderColor: selectBorderColor,
  backgroundColor: selectBackgroundColor,
};

export const dateTimeSelectStyle = (type: string): {} => ({
  flexDirection: "row",
  justifyContent: "space-between",
  width: type === "full" ? "100%" : "50%",
  alignItems: "center",
  backgroundColor: selectBackgroundColor,
  padding: 10,
  borderColor: selectBorderColor,
  borderWidth: 1,
  borderLeftWidth: type === "right" ? 0 : undefined,
  borderTopLeftRadius: type === "right" ? 0 : 6,
  borderBottomLeftRadius: type === "right" ? 0 : 6,
  borderTopRightRadius: type === "left" ? 0 : 6,
  borderBottomRightRadius: type === "left" ? 0 : 6,
});

export const placeholderStyle = { fontSize: 16, color: placeholderTextColor };
export const textStyle = { fontSize: 16, color: textColor };
