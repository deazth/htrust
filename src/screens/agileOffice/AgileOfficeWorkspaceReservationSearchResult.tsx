import React from "react";
import {
  c_black,
  c_white,
  ScreenWrapper,
  unifi_c1,
  unifi_c2,
  unifi_c3,
  unifi_c4,
  unifi_c9,
  unifi_primary,
} from "components/styles";
import {
  Button,
  ScrollView,
  Text,
  useColorModeValue,
  Accordion,
  Icon,
  Flex,
  AlertDialog,
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
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";

export function AgileOfficeWorkspaceReservationSearchResult({
  route,
  navigation,
}) {
  const dispatch = useDispatch();
  const { fromDate, toDate, fromTime, toTime, result } = route.params;

  let displayDate: string;
  if (toDate) {
    displayDate = fromDate.getDate() + " ";
    const fromDateMonth = moment(fromDate).format("MMM");
    const toDateMonth = moment(toDate).format("MMM");
    const fromDateYear = fromDate.getFullYear();
    const toDateYear = toDate.getFullYear();
    if (fromDateMonth !== toDateMonth || fromDateYear !== toDateYear)
      displayDate += fromDateMonth + " ";
    if (fromDateYear !== toDateYear) displayDate += fromDateYear + " ";
    displayDate += "- " + moment(toDate).format("D MMM YYYY");
  } else displayDate = moment(fromDate).format("D MMM YYYY");

  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  const [seatID, setSeatid] = React.useState(null);
  const [seatLabel, setSeatLabel] = React.useState(null);

  const [isLoading, setIsloading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const cancelRef = React.useRef(null);

  const acco_text_color = useColorModeValue(c_black, c_white);
  const acco_floor_color = useColorModeValue(unifi_primary, unifi_c3);
  const acco_fc_color = useColorModeValue(unifi_c9, unifi_c2);
  const btn_bg_color = useColorModeValue(unifi_c4, unifi_primary);

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

  function selectSeat(seatid, seatlabel) {
    setSeatid(seatid);
    setSeatLabel(seatlabel);
    setShowConfirm(true);
  }

  function doSeatReserve() {
    const offsetMs = fromTime.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(fromTime.getTime() - offsetMs);
    const dateLocalT = new Date(toTime.getTime() - offsetMs);

    const inputs = {
      seat_id: seatID,
      stime: dateLocalF.toISOString().slice(0, 19).replace("T", " "),
      etime: dateLocalT.toISOString().slice(0, 19).replace("T", " "),
    };
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
      })
      .finally(() => {
        setShowConfirm(false);
        setIsloading(false);
      });
  }
  const color = useColorModeValue(unifi_c4, unifi_c1);

  return (
    <ScreenWrapper>
      <ScrollView w="100%" h="100%" contentContainerStyle={{ padding: 15 }}>
        <Text style={{ color, fontSize: 14, fontWeight: "bold" }}>
          Search for available workspace
        </Text>
        <View style={styles.datetimeRow}>
          <Text style={{ fontWeight: "bold", fontSize: 13, width: "50%" }}>
            Date: {displayDate}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              width: "50%",
              textAlign: "right",
            }}
          >
            Time: {moment(fromTime).format("h:mm A")}
            {" - "}
            {moment(toTime).format("h:mm A")}
          </Text>
        </View>
        {result.length > 0 ? (
          <>
            <Text>Search Result</Text>
            <Accordion>
              {result.map((rec) => (
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
                      {rec.fcs.map((fc) => (
                        <Accordion.Item key={fc.id}>
                          <Accordion.Summary _expanded={{ bg: acco_fc_color }}>
                            <Text color={acco_text_color}>
                              {fc.name} - {fc.count} seats
                            </Text>
                            <Accordion.Icon />
                          </Accordion.Summary>
                          <Accordion.Details>
                            {fc.gotlayout && (
                              <Button onPress={() => showSectionLayout(fc.id)}>
                                View Section Layout
                              </Button>
                            )}
                            <Flex
                              direction="row"
                              flexWrap="wrap"
                              justifyContent="space-evenly"
                            >
                              {fc.seats.map((seat) => (
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
                                  onPress={() => selectSeat(seat.id, seat.name)}
                                >
                                  {seat.name}
                                </Button>
                              ))}
                            </Flex>
                          </Accordion.Details>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Accordion.Details>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        ) : (
          <Text>No seat available for the selected parameter</Text>
        )}
        <View style={styles.legendContainer}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ ...styles.colorLegend, backgroundColor: "#FF622D" }}
            />
            <Text style={{ fontSize: 14, color }}>AVAILABLE</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ ...styles.colorLegend, backgroundColor: "#B5B5B5" }}
            />
            <Text style={{ fontSize: 14, color }}>BOOKED</Text>
          </View>
        </View>

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
              {/* <Text>From: {cfromtime.toLocaleString()}</Text>
                <Text>To: {ctotime.toLocaleString()}</Text> */}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setShowConfirm(false)}
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
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  datetimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  colorLegend: { width: 25, borderRadius: 5, marginRight: 10 },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});
