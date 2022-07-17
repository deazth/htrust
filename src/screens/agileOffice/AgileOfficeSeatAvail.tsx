import React from "react";
import {
  c_black,
  c_white,
  ScreenWrapper,
  unifi_c1,
  unifi_c2,
  unifi_c3,
  unifi_c4,
  unifi_c5,
  unifi_c6,
  unifi_c7,
  unifi_c8,
  unifi_c9,
  unifi_primary,
} from "components/styles";
import Button from "components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
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
} from "../../app/userSlice";
import axios from "axios";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
const dateFormat = [
  "en-UK",
  {
    month: "short",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions,
];
const timeFormat = [
  "en-US",
  {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  } as Intl.DateTimeFormatOptions,
];
export function AgileOfficeSeatAvail({ navigation }) {
  const dispatch = useDispatch();

  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  const [bID, setBid] = React.useState(null);
  const [fID, setFid] = React.useState(null);
  const [fcID, setFcid] = React.useState(null);
  const [seatID, setSeatid] = React.useState(null);
  const [seatLabel, setSeatLabel] = React.useState(null);
  const [isMoreThan1Day, setIsMoreThan1Day] = React.useState(false);
  const [dateTimePickerConfig, setDateTimePickerConfig] = React.useState<
    | {
        mode: "date" | "time";
        onChange: (event: any, date?: Date) => void;
        value?: Date;
      }
    | undefined
  >();
  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();
  const [fromTime, setFromTime] = React.useState<Date | undefined>();
  const [toTime, setToTime] = React.useState<Date | undefined>();
  const [buildList, setBuildList] = React.useState([]);
  const [floorList, setFloorList] = React.useState([]);
  const [fcList, setFcList] = React.useState([]);

  const [searchPressed, setSearchPressed] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [sResult, setSResult] = React.useState([]);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [cfromtime, setCFromtime] = React.useState(new Date());
  const [ctotime, setCTotime] = React.useState(new Date());
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
    setBid(building_id);
    loadFloorList(building_id);
    setFcList([]);
    setFcid(null);
    setFid(null);
    setIsloading(false);
  }

  function selectFloor(floor_id) {
    setIsloading(true);
    setFid(floor_id);
    loadFcList(floor_id);
    setFcid(null);
    setIsloading(false);
  }

  function selectSection(fc_id) {
    setFcid(fc_id);
  }

  function loadBuildList() {
    axios
      .post(baseurl + "t/ao/getBuildingList", [], config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            // alert(JSON.stringify(response.data.data));
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
        console.log("load building - got error");
        // dispatch(setTokerr(error.message));
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
          // alert(JSON.stringify(error));
        }

        // navigation.goBack();
      });
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
            // alert(JSON.stringify(response.data.data));
            setFloorList(response.data.data);
          } else {
            alert("Failed to fetch building list from the server");
          }
        }
      })
      .catch((error) => {
        console.log("load building - got error");
        // dispatch(setTokerr(error.message));
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
          // alert(JSON.stringify(error));
        }

        // navigation.goBack();
        return;
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
            // alert(JSON.stringify(response.data.data));
            setFcList(response.data.data);
          } else {
            alert("Failed to fetch building list from the server");
          }
        }
      })
      .catch((error) => {
        console.log("load building - got error");
        // dispatch(setTokerr(error.message));
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
          // alert(JSON.stringify(error));
        }

        // navigation.goBack();
        return;
      });
  }

  function searchAvail() {
    setIsloading(true);
    setCFromtime(fromTime);
    setCTotime(toTime);
    setSearchPressed(false);

    const offsetMs = fromTime.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(fromTime.getTime() - offsetMs);
    const dateLocalT = new Date(toTime.getTime() - offsetMs);

    const inputs = {
      building_id: bID,
      floor_id: fID,
      floor_section_id: fcID,
      start_time: dateLocalF.toISOString().slice(0, 19).replace("T", " "),
      end_time: dateLocalT.toISOString().slice(0, 19).replace("T", " "),
    };

    console.log("search seat availability");
    console.log(inputs);
    axios
      .post(baseurl + "t/ao/searchAvailableSeat", inputs, config)
      .then((response) => {
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data.msg));
        } else {
          if (response.data.msg == "Success") {
            // console.log(response.data.data);
            // alert(JSON.stringify(response.data.data));
            setSResult(response.data.data);
            setSearchPressed(true);
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
          // alert(JSON.stringify(error));
        }

        // navigation.goBack();
      })
      .finally(() => setIsloading(false));
  }

  function selectSeat(seatid, seatlabel) {
    setSeatid(seatid);
    setSeatLabel(seatlabel);
    setShowConfirm(true);
  }

  function doSeatReserve() {
    const offsetMs = cfromtime.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(cfromtime.getTime() - offsetMs);
    const dateLocalT = new Date(ctotime.getTime() - offsetMs);

    const inputs = {
      seat_id: seatID,
      stime: dateLocalF.toISOString().slice(0, 19).replace("T", " "),
      etime: dateLocalT.toISOString().slice(0, 19).replace("T", " "),
    };

    console.log("do seat reserve");
    console.log(inputs);

    setIsloading(true);
    axios
      .post(baseurl + "t/ao/doSeatReserve", inputs, config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            console.log(response.data.data);
            alert("Reservation successful");
            navigation.goBack();
            return;
          } else {
            alert(response.data.msg);
          }
        }
      })
      .catch((error) => {
        console.log("Seat reserve error");
        // dispatch(setTokerr(error.message));
        if (error.response) {
          console.log("Seat reserve - got error with response");
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            console.log(error);
            alert(JSON.stringify(error.response));
          }
        } else {
          console.log("Seat reserve - got error without response");
          console.log(error);
        }

        // navigation.goBack();
      })
      .finally(() => setIsloading(false));

    setShowConfirm(false);
  }

  React.useEffect(() => {
    setIsloading(true);
    loadBuildList();
    setIsloading(false);
  }, []);

  const color = useColorModeValue(unifi_c4, unifi_c1);

  return (
    <ScreenWrapper>
      <ScrollView w="100%" h="100%" contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color, fontSize: 14, fontWeight: "bold" }}>
          Search for available workspace
        </Text>
        <Text style={styles.label}>Choose Building</Text>
        <Select
          selectedValue={bID}
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
          selectedValue={fID}
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
                bID
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
          selectedValue={fcID}
          accessibilityLabel="Choose Section (optional)"
          placeholder="Please Select (optional)"
          {...selectStyle}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={selectSection}
        >
          {fcList.length != 0 ? (
            fcList.map((rec) => (
              <Select.Item label={rec.label} value={rec.id + ""} key={rec.id} />
            ))
          ) : (
            <Select.Item
              label={
                fID ? "This floor has no valid section" : "Select a floor first"
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
            onPress={() =>
              setDateTimePickerConfig({
                mode: "date",
                onChange: (_, d) => setFromDate(d),
                value: fromDate || new Date(),
              })
            }
          >
            <Text style={fromDate ? textStyle : placeholderStyle}>
              {fromDate
                ? fromDate.toLocaleDateString(...dateFormat)
                : isMoreThan1Day
                ? "Start Date"
                : "Please Select"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
          {isMoreThan1Day && (
            <Pressable
              style={dateTimeSelectStyle("right")}
              onPress={() =>
                setDateTimePickerConfig({
                  mode: "date",
                  onChange: (_, d) => setToDate(d),
                  value: toDate || new Date(),
                })
              }
            >
              <Text style={toDate ? textStyle : placeholderStyle}>
                {toDate ? toDate.toLocaleDateString(...dateFormat) : "End Date"}
              </Text>
              <Icon as={FontAwesome5} name="chevron-down" size={4} />
            </Pressable>
          )}
        </HStack>
        <Text style={styles.label}>Choose Time</Text>
        <HStack my={3} alignItems="flex-start">
          <Pressable
            style={dateTimeSelectStyle("left")}
            onPress={() =>
              setDateTimePickerConfig({
                mode: "time",
                onChange: (_, d) => setFromTime(d),
                value: fromTime || new Date(),
              })
            }
          >
            <Text style={fromTime ? textStyle : placeholderStyle}>
              {fromTime
                ? fromTime.toLocaleTimeString(...timeFormat)
                : "Start Time"}
            </Text>
            <Icon as={FontAwesome5} name="chevron-down" size={4} />
          </Pressable>
          <Pressable
            style={dateTimeSelectStyle("right")}
            onPress={() =>
              setDateTimePickerConfig({
                mode: "time",
                onChange: (_, d) => setToTime(d),
                value: toTime || new Date(),
              })
            }
          >
            <Text style={toTime ? textStyle : placeholderStyle}>
              {toTime ? toTime.toLocaleTimeString(...timeFormat) : "End Time"}
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
      <Modal
        isOpen={!!dateTimePickerConfig}
        onClose={() => setDateTimePickerConfig(undefined)}
        animationPreset="slide"
      >
        <Modal.Content w="100%" marginBottom={0} marginTop="auto">
          {/* <Modal.CloseButton /> */}
          {/* <Modal.Header>Select</Modal.Header> */}
          <Modal.Body>
            {!!dateTimePickerConfig && (
              <DateTimePicker
                value={dateTimePickerConfig.value}
                mode={dateTimePickerConfig.mode}
                display="spinner"
                is24Hour
                textColor={textColor}
                onChange={dateTimePickerConfig.onChange}
              />
            )}
            <View style={{ height: 10 }} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginTop: 18, color: "#353535", fontWeight: "bold" },
});
