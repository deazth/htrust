import React from "react";
import {
  Center,
  Text,
  ScrollView,
  HStack,
  Spacer,
  Icon,
  Modal,
  Spinner,
  View,
} from "native-base";
import axios from "axios";
import { Calendar } from "react-native-calendars";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  DiaryItemCards,
  FormBtnSubmit,
  InfoBox,
  PageTitle,
  ScreenWrapper,
} from "components/styles";
import { RefreshControl, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setTokerr,
  setUserObj,
  selectBaseUrl,
  selectUserToken,
} from "../../app/userSlice";

export function DiaryMain({ navigation }) {
  const dispatch = useDispatch();
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };

  var tomorrow = new Date();

  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadingGwd, setIsLoadingGwd] = React.useState(false);
  const [isFutureDate, setIsFutureDate] = React.useState(false);
  const [dayTotalHours, setDayTotalHours] = React.useState(0);
  const [inDate, setInDate] = React.useState(null);
  const [dayEntry, setDayEntry] = React.useState([]);
  const [markDates, setMarkDates] = React.useState({});
  const [selMonth, setSelMonth] = React.useState(tomorrow);

  var tomorrow = new Date();

  function selectedDate(indate = inDate) {
    var d1 = new Date();
    d1.setHours(0, 0, 0, 0);
    var d2 = new Date(indate);
    d2.setHours(0, 0, 0, 0);

    setIsFutureDate(d2 > d1);

    setInDate(indate);

    if (d2 > d1) {
      alert("Future date is not allowed");
      setDayEntry([]);
      return;
    }

    setIsLoadingGwd(true);

    // fetch from db
    console.log("GetGwdEntries input " + indate);
    const theinput = {
      indate: indate,
    };

    axios
      .post(baseurl + "t/diary/GetGwdEntries", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
          setIsLoadingGwd(true);
        } else {
          if (response.data.msg == "Success") {
            let reval = response.data.data.entries;
            console.log(reval);
            setDayEntry(reval);
            console.log(response.data.data.total);
            setDayTotalHours(response.data.data.total);
            setIsLoadingGwd(false);
          }
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(JSON.stringify(error.response));
          }
        } else {
          alert(JSON.stringify(error));
        }

        setIsLoadingGwd(true);
      });
  }

  function addEntry() {
    navigation.navigate("DiaryCrud", {
      gwdid: "-",
      seldate: inDate,
      action: "Add",
    });
  }

  function editEntry(gwd_id) {
    navigation.navigate("DiaryCrud", {
      gwdid: gwd_id,
      seldate: inDate,
      action: "Edit",
    });
  }

  function deleteEntry(gwd_id, gwd_title) {
    Alert.alert(
      "Confirm delete?",
      gwd_title,
      [
        {
          text: "Delete!",
          onPress: () => doDeleteEntry(gwd_id),
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  function doDeleteEntry(gwd_id) {
    setIsLoadingGwd(true);
    console.log("DelGwd input: " + gwd_id);
    const theinput = {
      gwd_id: gwd_id,
    };

    axios
      .post(baseurl + "t/diary/DelGwd", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            alert("Record deleted");
          }
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(
              "Error " +
                error.response.data.status_code +
                ": " +
                error.response.data.message
            );
          }
        } else {
          alert("Unknown error. ref: DelGwd");
        }
      });

    setIsLoadingGwd(false);

    selectedDate(inDate);
  }

  function loadCalendar(indate = selMonth) {
    console.log("GetMonCalendar input " + indate);
    const theinput = { indate };

    setRefreshing(true);

    axios
      .post(baseurl + "t/diary/GetMonCalendar", theinput, config)
      .then((response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            const reval = response.data.data;
            if (reval) setMarkDates(reval);
            if (inDate) selectedDate();
          }
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(
              "Error " +
                error.response.data.status_code +
                ": " +
                error.response.data.message
            );
          }
        } else {
          alert("Unknown error. ref: GetMonCalendar");
        }

        // navigation.goBack();
      })
      .finally(() => setRefreshing(false));
  }

  React.useEffect(() => {
    loadCalendar();

    const willFocusSubscription = navigation.addListener("focus", () => {
      loadCalendar();
    });

    return willFocusSubscription;
  }, []);

  return (
    <>
      <Modal isOpen={isLoadingGwd}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center flex={1} px="3">
              <HStack space={2} alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <PageTitle>Loading</PageTitle>
              </HStack>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <ScreenWrapper>
        <ScrollView
          w="100%"
          h="100%"
          contentContainerStyle={{ padding: 15 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadCalendar(tomorrow)}
            />
          }
        >
          <View style={styles.header} shadow={4}>
            <Text style={styles.headerItem}>Productivity</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.headerItem}>Daily</Text>
              <Text
                style={{
                  ...styles.headerItem,
                  color: "red",
                  textDecorationLine: "underline",
                }}
              >
                10%
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.headerItem}>Weekly</Text>
              <Text
                style={{
                  ...styles.headerItem,
                  color: "green",
                  textDecorationLine: "underline",
                }}
              >
                80%
              </Text>
            </View>
          </View>
          <Calendar
            maxDate={tomorrow}
            current={tomorrow}
            onMonthChange={(month) => {
              setSelMonth(month.dateString);
              loadCalendar(month.dateString);
            }}
            markingType={"period"}
            markedDates={markDates}
            onDayPress={(dateobj) => selectedDate(dateobj.dateString)}
          />
          <InfoBox m={3}>
            {inDate ? (
              <>
                <HStack alignItems="flex-start" p={2}>
                  <Text>
                    {new Date(inDate).toDateString()} :{" "}
                    {!isFutureDate && dayTotalHours + " hours"}
                  </Text>
                  <Spacer />
                  {!isFutureDate && (
                    <FormBtnSubmit
                      size="xs"
                      onPress={addEntry}
                      endIcon={<Icon as={FontAwesome5} name="plus" size={5} />}
                    >
                      Add
                    </FormBtnSubmit>
                  )}
                </HStack>

                {dayEntry.length > 0 ? (
                  dayEntry.map((item, index) => (
                    <DiaryItemCards
                      key={index}
                      title={item.title}
                      text1={item.tag_desc + " - " + item.type_desc}
                      text2={item.hours_spent + " hours"}
                      editAction={editEntry}
                      deleteAction={deleteEntry}
                      itemid={item.id}
                    />
                  ))
                ) : (
                  <Text>No entry for this date</Text>
                )}
              </>
            ) : (
              <Text>Please select a date</Text>
            )}
          </InfoBox>
        </ScrollView>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerItem: { fontSize: 13, fontWeight: "bold" },
});
