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
  Text,
  useColorModeValue,
  Icon,
  AlertDialog,
  View,
  Image,
  Select,
  CheckIcon,
  Pressable,
  FlatList,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBaseUrl,
  selectUserToken,
  setTokerr,
  setUserObj,
} from "app/userSlice";
import axios from "axios";
import { StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

export function AgileOfficeWorkspaceReservationSearchResult({
  route,
  navigation,
}) {
  const dispatch = useDispatch();
  const { fromDate, toDate, fromTime, toTime, result, building, floor } =
    route.params;

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
  const [sectionId, setSectionId] = React.useState(result?.fcs?.[0]?.id);
  const { width } = useWindowDimensions();

  const [isLoading, setIsloading] = React.useState(false);

  const cancelRef = React.useRef(null);

  const bg_color = useColorModeValue(unifi_c4, unifi_primary);

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
        setSeatid();
        setIsloading(false);
      });
  }
  const color = useColorModeValue(unifi_c4, unifi_c1);
  const seats = result?.fcs?.filter((f) => f.id == sectionId);

  const padding = 15;

  return (
    <ScreenWrapper>
      <View w="100%" h="100%" style={{ padding }}>
        <Text style={{ color, fontSize: 14, fontWeight: "bold" }}>
          Search for available workspace
        </Text>
        <View style={styles.datetimeRow}>
          <Text style={styles.datetime}>Date: {displayDate}</Text>
          <Text style={{ ...styles.datetime, textAlign: "right" }}>
            Time: {moment(fromTime).format("h:mm A")}
            {" - "}
            {moment(toTime).format("h:mm A")}
          </Text>
        </View>
        <View style={{ ...styles.headerContainer, backgroundColor: bg_color }}>
          <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>
            {building?.building_name}
            {floor && " - " + floor.floor_name}
          </Text>
          {/* {section && (
            <View style={styles.sectionContainer}>
              <Text style={{ fontSize: 12, color: bg_color, marginRight: 10 }}>
                {section.label}
              </Text>
              <Icon as={FontAwesome5} name="chevron-down" size={4} />
            </View>
          )} */}
          {!!result?.fcs?.length && (
            <Select
              selectedValue={"" + sectionId}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              borderColor="transparent"
              backgroundColor="white"
              style={{ fontSize: 13 }}
              w={110}
              h={6}
              pt={2.5}
              onValueChange={setSectionId}
            >
              {result.fcs.map((r) => (
                <Select.Item label={r.name} value={"" + r.id} key={"" + r.id} />
              ))}
            </Select>
          )}
        </View>
        {seats.map((fc) => (
          <>
            <Image
              alt="layout"
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
              }}
              source={{
                // uri: baseurl + "ao/getSectionLayout?id=" + result.id, // floor layout
                uri: baseurl + "ao/getSectionLayout?id=" + fc.id, // section layout
              }}
            />
            <View style={styles.legendContainer}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    ...styles.colorLegend,
                    backgroundColor: "#FF622D",
                  }}
                />
                <Text style={{ fontSize: 14, color }}>AVAILABLE</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    ...styles.colorLegend,
                    backgroundColor: "#B5B5B5",
                  }}
                />
                <Text style={{ fontSize: 14, color }}>BOOKED</Text>
              </View>
            </View>
            <FlatList
              style={{ backgroundColor: "#E2E4E8" }}
              numColumns={5}
              data={fc.seats}
              keyExtractor={(item) => item.id + ""}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    width: width / 5 - padding - 1,
                    margin: 5,
                    borderRadius: 5,
                    padding: 3,
                    backgroundColor: "#FF622D",
                  }}
                  onPress={() => setSeatid(item.id)}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </>
        ))}
        {!seats.length && (
          <Text>No seat available for the selected parameter</Text>
        )}

        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={!!seatID}
          onClose={() => setSeatid()}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton
              icon={<Icon as={FontAwesome5} name="times" size={4} />}
            />
            <AlertDialog.Header>
              {seats.find((s) => s.id == seatID)?.name}
            </AlertDialog.Header>
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
                  onPress={() => setSeatid()}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  isLoadingText="Please Wait"
                  colorScheme="primary"
                  onPress={doSeatReserve}
                >
                  Reserve
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  datetimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  datetime: {
    fontWeight: "bold",
    fontSize: 13,
    width: "50%",
  },
  colorLegend: { width: 25, borderRadius: 5, marginRight: 10 },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
