import React from "react";
import { ScreenWrapper, unifi_c1, unifi_c4, unifi_c9 } from "components/styles";
import Button from "components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  CheckIcon,
  HStack,
  ScrollView,
  Select,
  Text,
  useColorModeValue,
  Icon,
  Checkbox,
  Modal,
  View,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBaseUrl,
  selectUserToken,
  setTokerr,
  setUserObj,
} from "app/userSlice";
import axios from "axios";
import { Platform, Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export function AgileOfficeWorkspaceReservation({ navigation }) {
  const dispatch = useDispatch();

  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  const [buildingId, setBuildingId] = React.useState(null);
  const [floorId, setFloorId] = React.useState(null);
  const [sectionId, setSectionId] = React.useState(null);
  const [isMoreThan1Day, setIsMoreThan1Day] = React.useState(false);
  const [dateTimePickerConfig, setDateTimePickerConfig] = React.useState<
    | {
        mode: "date" | "time";
        onChange: (date?: Date) => void;
      }
    | undefined
  >();
  const [tempDateTime, setTempDateTime] = React.useState<Date | undefined>();
  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();
  const [fromTime, setFromTime] = React.useState<Date | undefined>();
  const [toTime, setToTime] = React.useState<Date | undefined>();
  const [buildList, setBuildList] = React.useState([]);
  const [floorList, setFloorList] = React.useState([]);
  const [sectionList, setSectionList] = React.useState([]);

  const [isLoading, setIsloading] = React.useState(false);

  const placeholderTextColor = useColorModeValue("#C2C2C2", unifi_c9);
  const textColor = useColorModeValue("black", unifi_c9);
  const selectBorderColor = useColorModeValue("#707070", undefined);
  const selectBackgroundColor = useColorModeValue("white", "#707070");

  const selectStyle = {
    placeholderTextColor,
    borderColor: selectBorderColor,
    backgroundColor: selectBackgroundColor,
  };

  const dateTimeSelectStyle = (type: string): {} => ({
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

  const placeholderStyle = { fontSize: 16, color: placeholderTextColor };
  const textStyle = { fontSize: 16, color: textColor };

  function selectBuilding(building_id) {
    setIsloading(true);
    setBuildingId(building_id);
    loadFloorList(building_id);
    setSectionList([]);
    setSectionId(null);
    setFloorId(null);
    setIsloading(false);
  }

  function selectFloor(floor_id) {
    setIsloading(true);
    setFloorId(floor_id);
    loadFcList(floor_id);
    setSectionId(null);
    setIsloading(false);
  }

  function loadBuildList() {
    setIsloading(true);
    axios
      .post(baseurl + "t/ao/getBuildingList", [], config)
      .then((response) => {
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            const resptime = new Date(response.headers.date);
            const futtime = new Date(resptime.getTime() + 5 * 60000);
            setFromTime(futtime);
            setToTime(futtime);
            setBuildList(response.data.data);
          } else {
            alert("Failed to fetch building list from the server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("load building - got error with response");
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log(error);
            alert(JSON.stringify(error.response));
          }
        } else {
          console.log("load building - got error without response");
          console.log(error);
        }
      })
      .finally(() => setIsloading(false));
  }

  function loadFloorList(b_id) {
    axios
      .post(baseurl + "t/ao/getFloorList", { building_id: b_id }, config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            setFloorList(response.data.data);
          } else {
            alert("Failed to fetch building list from the server");
          }
        }
      })
      .catch((error) => {
        console.log("load building - got error");
        if (error.response) {
          console.log("load building - got error with response");
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log(error);
            alert(JSON.stringify(error.response));
          }
        } else {
          console.log("load building - got error without response");
          console.log(error);
        }
      });
  }

  function loadFcList(f_id) {
    axios
      .post(baseurl + "t/ao/getSectionList", { floor_id: f_id }, config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            setSectionList(response.data.data);
          } else {
            alert("Failed to fetch building list from the server");
          }
        }
      })
      .catch((error) => {
        console.log("load building - got error");
        if (error.response) {
          console.log("load building - got error with response");
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log(error);
            alert(JSON.stringify(error.response));
          }
        } else {
          console.log("load building - got error without response");
          console.log(error);
        }
      });
  }

  function searchAvail() {
    setIsloading(true);

    const offsetMs = fromTime.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(fromTime.getTime() - offsetMs);
    const dateLocalT = new Date(toTime.getTime() - offsetMs);

    const inputs = {
      building_id: buildingId,
      floor_id: floorId,
      floor_section_id: sectionId,
      start_time: dateLocalF.toISOString().slice(0, 19).replace("T", " "),
      end_time: dateLocalT.toISOString().slice(0, 19).replace("T", " "),
    };

    axios
      .post(baseurl + "t/ao/searchAvailableSeat", inputs, config)
      .then((response) => {
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data.msg));
        } else {
          if (response.data.msg == "Success") {
            navigation.navigate("AgileOfficeWorkspaceReservationSearchResult", {
              fromDate,
              toDate: isMoreThan1Day ? toDate : undefined,
              fromTime,
              toTime,
              result: response.data.data,
              section: sectionList.find((s) => s.id === +sectionId),
              building: buildList.find((b) => b.id === +buildingId),
              floor: floorList.find((f) => f.id === +floorId),
            });
          } else {
            alert(response.data.msg);
          }
        }
      })
      .catch((error) => {
        console.log("Seat finder error");
        // dispatch(setTokerr(error.message));
        if (error.response) {
          console.log("Seat finder - got error with response");
          if (error.response.data.message == "Unauthenticated.") {
            alert("Your session has expired");
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log(error);
            alert(JSON.stringify(error.response));
          }
        } else {
          console.log("Seat finder - got error without response");
          console.log(error);
        }
      })
      .finally(() => setIsloading(false));
  }

  React.useEffect(loadBuildList, []);

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
          {...selectStyle}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={selectBuilding}
        >
          {buildList.map((rec) => (
            <Select.Item
              label={rec.building_name}
              value={rec.id + ""}
              key={rec.id}
            />
          ))}
        </Select>
        <Text style={styles.label}>Choose Floor</Text>
        <Select
          selectedValue={floorId}
          accessibilityLabel="Choose Floor (optional)"
          placeholder="Please Select (optional)"
          {...selectStyle}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={selectFloor}
        >
          {floorList.length != 0 ? (
            floorList.map((rec) => (
              <Select.Item
                label={rec.floor_name}
                value={rec.id + ""}
                key={rec.id}
              />
            ))
          ) : (
            <Select.Item
              label={
                buildingId
                  ? "This building has no valid floor"
                  : "Select a building first"
              }
              value=""
              disabled
            />
          )}
        </Select>
        <Text style={styles.label}>Choose Section</Text>
        <Select
          selectedValue={sectionId}
          accessibilityLabel="Choose Section (optional)"
          placeholder="Please Select (optional)"
          {...selectStyle}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={setSectionId}
        >
          {sectionList.length != 0 ? (
            sectionList.map((s) => (
              <Select.Item label={s.label} value={s.id + ""} key={s.id} />
            ))
          ) : (
            <Select.Item
              label={
                floorId
                  ? "This floor has no valid section"
                  : "Select a floor first"
              }
              value=""
              disabled
            />
          )}
        </Select>
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
            style={dateTimeSelectStyle(isMoreThan1Day ? "left" : "full")}
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
              style={dateTimeSelectStyle("right")}
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
            style={dateTimeSelectStyle("left")}
            onPress={() => {
              setTempDateTime(fromTime || new Date());
              setDateTimePickerConfig({ mode: "time", onChange: setFromTime });
            }}
          >
            <Text style={fromTime ? textStyle : placeholderStyle}>
              {fromTime ? moment(fromTime).format("h:mm A") : "Start Time"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
          <Pressable
            style={dateTimeSelectStyle("right")}
            onPress={() => {
              setTempDateTime(toTime || new Date());
              setDateTimePickerConfig({ mode: "time", onChange: setToTime });
            }}
          >
            <Text style={toTime ? textStyle : placeholderStyle}>
              {toTime ? moment(toTime).format("h:mm A") : "End Time"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
        </HStack>
        <Button
          style={{ marginTop: 20 }}
          label={isLoading ? "Please wait" : "Search"}
          onPress={searchAvail}
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
          animationPreset="slide"
        >
          <Modal.Content w="100%" marginBottom={0} marginTop="auto">
            {/* <Modal.CloseButton /> */}
            {/* <Modal.Header>Select</Modal.Header> */}
            <Modal.Body>
              {!!dateTimePickerConfig && !!tempDateTime && (
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
                  dateTimePickerConfig.onChange(tempDateTime);
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
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginTop: 18, color: "#353535", fontWeight: "bold" },
});
