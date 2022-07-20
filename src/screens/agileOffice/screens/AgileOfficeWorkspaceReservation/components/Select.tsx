import { unifi_c9 } from "components/styles";
import {
  CheckIcon,
  Select as NativeSelect,
  useColorModeValue,
} from "native-base";
import { ISelectProps } from "native-base/lib/typescript/components/primitives/Select";
import { Option } from "types";

interface SelectProps extends ISelectProps {
  list: Option[];
  sectionError?: string;
}

const Select: React.FC<SelectProps> = ({ list, sectionError, ...props }) => {
  const placeholderTextColor = useColorModeValue("#C2C2C2", unifi_c9);
  const selectBorderColor = useColorModeValue("#707070", undefined);
  const selectBackgroundColor = useColorModeValue("white", "#707070");
  return (
    <NativeSelect
      placeholderTextColor={placeholderTextColor}
      borderColor={selectBorderColor}
      backgroundColor={selectBackgroundColor}
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      {...props}
    >
      {list.length ? (
        list.map((rec) => (
          <NativeSelect.Item
            key={rec.key}
            label={rec.label}
            value={rec.key + ""}
          />
        ))
      ) : (
        <NativeSelect.Item label={sectionError} value="" disabled />
      )}
    </NativeSelect>
  );
};

export default Select;
