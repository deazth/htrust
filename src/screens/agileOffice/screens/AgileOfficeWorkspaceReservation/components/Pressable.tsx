import {
  IPressableProps,
  Pressable as NativePressable,
  useColorModeValue,
} from "native-base";

interface Props extends IPressableProps {
  type: "full" | "right" | "left";
}

const Pressable: React.FC<Props> = ({ type, ...props }) => {
  const selectBorderColor = useColorModeValue("#707070", undefined);
  const selectBackgroundColor = useColorModeValue("white", "#707070");

  return (
    <NativePressable
      {...props}
      style={{
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
      }}
    />
  );
};

export default Pressable;
