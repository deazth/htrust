import React from "react";
import { Platform, StyleSheet } from "react-native";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  CheckIcon,
  HStack,
  ScrollView,
  Text,
  useColorModeValue,
  Icon,
  Checkbox,
  Modal,
  View,
} from "native-base";

import Button from "components/Button";
import { ScreenWrapper, unifi_c1, unifi_c4, unifi_c9 } from "components/styles";

import { Select, Pressable } from "./components";

import useWorkspaceReservation from "./useWorkspaceReservation";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AgileOfficeTabStackParamList } from "navigators/AgileOfficeTab";

interface Props {
  navigation: NativeStackNavigationProp<
    AgileOfficeTabStackParamList,
    "AgileOfficeWorkspaceReservation"
  >;
}

export const AgileOfficeWorkspaceReservation: React.FC<Props> = ({
  navigation,
}) => {
  const {
    buildingId,
    floorId,
    sectionId,
    buildList,
    floorList,
    sectionList,
    isLoading,
    time,
    setTime,
    setSectionId,
    searchAvailableSeat,
    selectBuilding,
    selectFloor,
  } = useWorkspaceReservation(navigation);
  const textColor = useColorModeValue("black", unifi_c9);
  const placeholderTextColor = useColorModeValue("#C2C2C2", unifi_c9);

  const placeholderStyle = { fontSize: 16, color: placeholderTextColor };
  const textStyle = { fontSize: 16, color: textColor };
  const [isMoreThan1Day, setIsMoreThan1Day] = React.useState(false);
  const [dateTimePickerConfig, setDateTimePickerConfig] = React.useState<
    | {
        mode: "date" | "time";
        onChange: (date: Date | undefined) => void;
      }
    | undefined
  >();
  const [tempDateTime, setTempDateTime] = React.useState<Date | undefined>();
  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();

  const color = useColorModeValue(unifi_c4, unifi_c1);

  return (
    <ScreenWrapper>
      <ScrollView w="100%" h="100%" contentContainerStyle={{ padding: 15 }}>
        <Text style={{ color, fontSize: 14, fontWeight: "bold" }}>
          Search for available workspace
        </Text>
        <Text style={styles.label}>Choose Building</Text>
        <Select
          selectedValue={buildingId}
          accessibilityLabel="Choose Building"
          placeholder="Please Select"
          onValueChange={selectBuilding}
          list={buildList.map((rec) => ({
            key: rec.id,
            label: rec.building_name,
          }))}
        />

        <Text style={styles.label}>Choose Floor</Text>
        <Select
          selectedValue={floorId}
          accessibilityLabel="Choose Floor (optional)"
          placeholder="Please Select (optional)"
          onValueChange={selectFloor}
          list={floorList.map((rec) => ({
            key: rec.id,
            label: rec.floor_name,
          }))}
          sectionError={
            buildingId
              ? "This building has no valid floor"
              : "Select a building first"
          }
        />

        <Text style={styles.label}>Choose Section</Text>
        <Select
          selectedValue={sectionId}
          accessibilityLabel="Choose Section (optional)"
          placeholder="Please Select (optional)"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={setSectionId}
          list={sectionList.map((rec) => ({
            key: rec.id,
            label: rec.floor_name,
          }))}
          sectionError={
            floorId ? "This floor has no valid section" : "Select a floor first"
          }
        />

        <Text style={styles.label}>Choose Date</Text>
        <HStack space={2} mt={1} alignItems="center">
          <Checkbox.Group
            onChange={() => setIsMoreThan1Day((v) => !v)}
            value={isMoreThan1Day ? ["1"] : []}
            accessibilityLabel="choose"
          >
            <Checkbox colorScheme="blue" bgColor="red" value="1" />
          </Checkbox.Group>
          <Text style={{ fontSize: 14 }}>More Than One Day</Text>
        </HStack>
        <HStack my={3} alignItems="flex-start">
          <Pressable
            type={isMoreThan1Day ? "left" : "full"}
            onPress={() => {
              setTempDateTime(fromDate || new Date());
              setDateTimePickerConfig({ mode: "date", onChange: setFromDate });
            }}
          >
            <Text style={fromDate ? textStyle : placeholderStyle}>
              {fromDate
                ? moment(fromDate).format("D MMM YYYY")
                : isMoreThan1Day
                ? "Start Date"
                : "Please Select"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
          {isMoreThan1Day && (
            <Pressable
              type="right"
              onPress={() => {
                setTempDateTime(toDate || new Date());
                setDateTimePickerConfig({ mode: "date", onChange: setToDate });
              }}
            >
              <Text style={toDate ? textStyle : placeholderStyle}>
                {toDate ? moment(toDate).format("D MMM YYYY") : "End Date"}
              </Text>
              <Icon as={FontAwesome5} name="chevron-down" size={4} />
            </Pressable>
          )}
        </HStack>
        <Text style={styles.label}>Choose Time</Text>
        <HStack my={3} alignItems="flex-start">
          <Pressable
            type="left"
            onPress={() => {
              setTempDateTime(time.from || new Date());
              setDateTimePickerConfig({
                mode: "time",
                onChange: (date) => setTime({ ...time, from: date }),
              });
            }}
          >
            <Text style={time.from ? textStyle : placeholderStyle}>
              {time.from ? moment(time.from).format("h:mm A") : "Start Time"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
          <Pressable
            type="right"
            onPress={() => {
              setTempDateTime(time.to || new Date());
              setDateTimePickerConfig({
                mode: "time",
                onChange: (date) => setTime({ ...time, to: date }),
              });
            }}
          >
            <Text style={time.to ? textStyle : placeholderStyle}>
              {time.to ? moment(time.to).format("h:mm A") : "End Time"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
        </HStack>
        <Button
          style={{ marginTop: 20 }}
          label={isLoading ? "Please wait" : "Search"}
          onPress={() => searchAvailableSeat(fromDate, isMoreThan1Day, toDate)}
          loading={isLoading}
        />
      </ScrollView>
      {Platform.OS === "android" && !!dateTimePickerConfig && !!tempDateTime && (
        <DateTimePicker
          value={tempDateTime}
          mode={dateTimePickerConfig.mode}
          is24Hour
          textColor={textColor}
          onTouchCancel={() => setDateTimePickerConfig(undefined)}
          onChange={(_, d) => {
            setDateTimePickerConfig(undefined);
            dateTimePickerConfig.onChange(d);
          }}
        />
      )}
      {Platform.OS === "ios" && (
        <Modal
          isOpen={!!dateTimePickerConfig}
          onClose={() => setDateTimePickerConfig(undefined)}
          animation="slide"
        >
          <Modal.Content w="100%" marginBottom={0} marginTop="auto">
            {/* <Modal.CloseButton /> */}
            {/* <Modal.Header>Select</Modal.Header> */}
            <Modal.Body>
              {dateTimePickerConfig && tempDateTime && (
                <DateTimePicker
                  value={tempDateTime}
                  mode={dateTimePickerConfig.mode}
                  display="spinner"
                  is24Hour
                  textColor={textColor}
                  onChange={(_, d) => setTempDateTime(d)}
                />
              )}
              <Button
                label="Confirm"
                onPress={() => {
                  dateTimePickerConfig?.onChange(tempDateTime);
                  setDateTimePickerConfig(undefined);
                }}
                loading={isLoading}
              />
              <View style={{ height: 10 }} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 14, marginTop: 18, color: "#353535", fontWeight: "bold" },
});