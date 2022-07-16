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
import MainButton from "components/Button";
import {
  Button,
  Box,
  CheckIcon,
  HStack,
  ScrollView,
  Select,
  Spacer,
  Text,
  useColorModeValue,
  Accordion,
  Icon,
  Flex,
  AlertDialog,
  Checkbox,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBaseUrl,
  selectUserToken,
  setTokerr,
  setUserObj,
} from "../../app/userSlice";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

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
  const [showFromDPicker, setShowFromDPicker] = React.useState(false);
  const [showToDPicker, setShowToDPicker] = React.useState(false);
  const [showFromTPicker, setShowFromTPicker] = React.useState(false);
  const [showToTPicker, setShowToTPicker] = React.useState(false);
  const [fromtime, setFromtime] = React.useState(new Date());
  const [totime, setTotime] = React.useState(new Date());
  const [buildList, setBuildList] = React.useState([]);
  const [floorList, setFloorList] = React.useState([]);
  const [fcList, setFcList] = React.useState([]);

  const [searchPressed, setSearchPressed] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [sResult, setSResult] = React.useState([]);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [cfromtime, setCFromtime] = React.useState(new Date());
  const [ctotime, setCTotime] = React.useState(new Date());
  const cancelRef = React.useRef(null);

  // const [showLayout, setShowLayout] = React.useState(false);
  // const [layoutUrl, setLayoutUrl] = React.useState(null);

  // center spacing to and from
  const fontFamily = Platform.OS === "ios" ? "Courier" : "monospace";

  const form_bg_color = useColorModeValue(c_white, unifi_c7);
  const acco_text_color = useColorModeValue(c_black, c_white);
  const acco_floor_color = useColorModeValue(unifi_primary, unifi_c3);
  const acco_fc_color = useColorModeValue(unifi_c9, unifi_c2);
  const placeholderTextColor = useColorModeValue("#C2C2C2", unifi_c9);
  const btn_bg_color = useColorModeValue(unifi_c4, unifi_primary);

  const selectStyle = {
    placeholderTextColor,
    borderColor: "#707070",
    backgroundColor: "white",
  };

  function showFloorLayout(floor_id) {
    // setLayoutUrl(baseurl + 'ao/getFloorLayout?id=' + floor_id);
    WebBrowser.openBrowserAsync(baseurl + "ao/getFloorLayout?id=" + floor_id);
    // setShowLayout(true);
  }

  function showSectionLayout(fcc_id) {
    // setLayoutUrl(baseurl + 'ao/getSectionLayout?id=' + fcc_id);
    WebBrowser.openBrowserAsync(baseurl + "ao/getSectionLayout?id=" + fcc_id);
    // setShowLayout(true);
  }

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
            setFromtime(futtime);
            setTotime(futtime);
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
    setCFromtime(fromtime);
    setCTotime(totime);
    setSearchPressed(false);

    const offsetMs = fromtime.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(fromtime.getTime() - offsetMs);
    const dateLocalT = new Date(totime.getTime() - offsetMs);

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

  const showChangeFromDate = () => setShowFromDPicker(true);

  const showChangeToDate = () => setShowToDPicker(true);

  const showChangeFromTime = () => setShowFromTPicker(true);

  const showChangeToTime = () => setShowToTPicker(true);

  const changeFromDate = (event, selectedDate) => {
    setShowFromDPicker(false);
    setFromtime(selectedDate || fromtime);
  };

  const changeFromTime = (event, selectedDate) => {
    setShowFromTPicker(false);
    setFromtime(selectedDate || fromtime);
  };

  const changeToDate = (event, selectedDate) => {
    setShowToDPicker(false);
    setTotime(selectedDate || fromtime);
  };

  const changeToTime = (event, selectedDate) => {
    setShowToTPicker(false);
    setTotime(selectedDate || fromtime);
  };

  React.useEffect(() => {
    setIsloading(true);
    loadBuildList();
    setIsloading(false);
  }, []);

  const color = useColorModeValue(unifi_c4, unifi_c1);

  return (
    <ScreenWrapper>
      <ScrollView w="100%" h="100%" contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color, fontSize: 14 }}>
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
            <Checkbox borderColor="#1C04E3" value="1" />
          </Checkbox.Group>
          <Text style={{ fontSize: 14 }}>More Than One Day</Text>
        </HStack>

        <HStack my={3} alignItems="flex-start">
          <Text fontSize="sm" style={{ fontFamily }}>
            From :
          </Text>
          <Spacer />
          <Text
            fontSize="sm"
            color={placeholderTextColor}
            onPress={showChangeFromDate}
          >
            {fromtime.toLocaleDateString()}
          </Text>
          <Spacer />
          <Text
            fontSize="sm"
            color={placeholderTextColor}
            onPress={showChangeFromTime}
          >
            {fromtime.toLocaleTimeString()}
          </Text>
        </HStack>

        <HStack mb={3} alignItems="flex-start">
          <Text fontSize="sm" style={{ fontFamily }}>
            To :
          </Text>
          <Spacer />
          <Text
            fontSize="sm"
            color={placeholderTextColor}
            onPress={showChangeToDate}
          >
            {totime.toLocaleDateString()}
          </Text>
          <Spacer />
          <Text
            fontSize="sm"
            color={placeholderTextColor}
            onPress={showChangeToTime}
          >
            {totime.toLocaleTimeString()}
          </Text>
        </HStack>

        <MainButton
          label={isLoading ? "Please wait" : "Search"}
          onPress={searchAvail}
          loading={isLoading}
        />

        {showFromDPicker && (
          <DateTimePicker
            testID="showFromDPicker"
            value={fromtime}
            mode="date"
            is24Hour
            display="default"
            onChange={changeFromDate}
          />
        )}
        {showFromTPicker && (
          <DateTimePicker
            testID="showFromTPicker"
            value={fromtime}
            mode="time"
            is24Hour
            display="default"
            onChange={changeFromTime}
          />
        )}
        {showToDPicker && (
          <DateTimePicker
            testID="showToDPicker"
            value={totime}
            mode="date"
            is24Hour
            display="default"
            onChange={changeToDate}
          />
        )}
        {showToTPicker && (
          <DateTimePicker
            testID="showToTPicker"
            value={totime}
            mode="time"
            is24Hour
            display="default"
            onChange={changeToTime}
          />
        )}

        {searchPressed && (
          <Box border={1} m={3} p={2} bg={form_bg_color} w="95%" rounded="10px">
            {sResult.length > 0 ? (
              <>
                <Text>Search Result</Text>
                <Accordion>
                  {sResult.map((rec) => (
                    <Accordion.Item key={rec.id}>
                      <Accordion.Summary _expanded={{ bg: acco_floor_color }}>
                        <Text color={acco_text_color}>
                          {rec.name} - {rec.count} seats
                        </Text>
                        <Accordion.Icon />
                      </Accordion.Summary>
                      <Accordion.Details>
                        {rec.gotlayout && (
                          <Button onPress={() => showFloorLayout(rec.id)}>
                            View Floor Layout
                          </Button>
                        )}
                        <Accordion>
                          {rec.fcs.map((fc) => {
                            return (
                              <Accordion.Item key={fc.id}>
                                <Accordion.Summary
                                  _expanded={{ bg: acco_fc_color }}
                                >
                                  <Text color={acco_text_color}>
                                    {fc.name} - {fc.count} seats
                                  </Text>
                                  <Accordion.Icon />
                                </Accordion.Summary>
                                <Accordion.Details>
                                  {fc.gotlayout && (
                                    <Button
                                      onPress={() => showSectionLayout(fc.id)}
                                    >
                                      View Section Layout
                                    </Button>
                                  )}
                                  <Flex
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent="space-evenly"
                                  >
                                    {fc.seats.map((seat) => {
                                      return (
                                        <Button
                                          m={1}
                                          p={1}
                                          backgroundColor={btn_bg_color}
                                          key={seat.id}
                                          endIcon={
                                            <Icon
                                              as={FontAwesome5}
                                              name="calendar-check"
                                              size={4}
                                            />
                                          }
                                          onPress={() =>
                                            selectSeat(seat.id, seat.name)
                                          }
                                        >
                                          {seat.name}
                                        </Button>
                                      );
                                    })}
                                  </Flex>
                                </Accordion.Details>
                              </Accordion.Item>
                            );
                          })}
                        </Accordion>
                      </Accordion.Details>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </>
            ) : (
              <Text>No seat available for the selected parameter</Text>
            )}

            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={showConfirm}
              onClose={() => setShowConfirm(false)}
            >
              <AlertDialog.Content>
                <AlertDialog.CloseButton
                  icon={<Icon as={FontAwesome5} name="times" size={4} />}
                />
                <AlertDialog.Header>{seatLabel}</AlertDialog.Header>
                <AlertDialog.Body>
                  <Text>Confirm reserve this workspace?</Text>
                  <Text>From: {cfromtime.toLocaleString()}</Text>
                  <Text>To: {ctotime.toLocaleString()}</Text>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="unstyled"
                      colorScheme="coolGray"
                      onPress={() => {
                        setShowConfirm(false);
                      }}
                      ref={cancelRef}
                    >
                      Cancel
                    </Button>
                    <Button
                      isLoading={isLoading}
                      isLoadingText="Please Wait"
                      colorScheme="primary"
                      onPress={() => doSeatReserve()}
                    >
                      Reserve
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Box>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginTop: 18, color: "#353535", fontWeight: "bold" },
});
