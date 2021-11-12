import React from 'react';
import { DarkModeToggle, ScreenWrapper, unifi_c4, unifi_c6, unifi_c7, unifi_c9 } from '../../components/styles';
// import {StackedBarChart, YAxis } from 'react-native-svg-charts';
import { Button, Box, CheckIcon, HStack, ScrollView, Select, Spacer, Text, useColorModeValue } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseUrl, selectUserToken, setTokerr, setUserObj } from '../../app/userSlice';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';


export function AoSeatAvail() {
  const dispatch = useDispatch();
  
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` }
  };

  const [bID, setBid] = React.useState(null);
  const [fID, setFid] = React.useState(null);
  const [fcID, setFcid] = React.useState(null);
  const [showFromDPicker, setShowFromDPicker] = React.useState(false);
  const [showToDPicker, setShowToDPicker] = React.useState(false);
  const [showFromTPicker, setShowFromTPicker] = React.useState(false);
  const [showToTPicker, setShowToTPicker] = React.useState(false);
  const [fromtime, setFromtime] = React.useState(new Date());
  const [totime, setTotime] = React.useState(new Date());
  const [buildList, setBuildList] = React.useState([]);
  const [floorList, setFloorList] = React.useState([]);
  const [fcList, setFcList] = React.useState([]);

  // center spacing to and from
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';

  const form_bg_color = useColorModeValue(unifi_c6, unifi_c7);
  const placeholder_color = useColorModeValue(unifi_c4, unifi_c9);
  

  function selectBuilding(building_id){
    setBid(building_id);
    loadFloorList(building_id);
    setFcid(null);
    setFid(null);
  }

  function selectFloor(floor_id){
    setFid(floor_id);
    loadFcList(floor_id);
    setFcid(null);
  }

  function selectSection(fc_id){
    setFcid(fc_id);
  }

  function loadBuildList(){
    axios.post(
      baseurl + 't/ao/getBuildingList', [], config
    ).then((response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          // alert(JSON.stringify(response.data.data));
          var resptime = new Date(response.headers.date);
          var futtime = new Date(resptime.getTime() + 5 * 60000);
          setFromtime(futtime);
          setTotime(futtime);
          setBuildList(response.data.data);
        } else {
          alert('Failed to fetch building list from the server')
        }
      }
      
    }).catch(error => {
      console.log("load building - got error");
      // dispatch(setTokerr(error.message));
      if(error.response) {
        console.log("load building - got error with response");
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
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

  function loadFloorList(b_id){
    axios.post(
      baseurl + 't/ao/getFloorList', {building_id : b_id}, config
    ).then((response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          // alert(JSON.stringify(response.data.data));
          setFloorList(response.data.data);
        } else {
          alert('Failed to fetch building list from the server')
        }
      }
      
    }).catch(error => {
      console.log("load building - got error");
      // dispatch(setTokerr(error.message));
      if(error.response) {
        console.log("load building - got error with response");
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
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

  function loadFcList(f_id){
    axios.post(
      baseurl + 't/ao/getSectionList', {floor_id : f_id}, config
    ).then((response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          // alert(JSON.stringify(response.data.data));
          setFcList(response.data.data);
        } else {
          alert('Failed to fetch building list from the server')
        }
      }
      
    }).catch(error => {
      console.log("load building - got error");
      // dispatch(setTokerr(error.message));
      if(error.response) {
        console.log("load building - got error with response");
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
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

  function showChangeFromDate(){
    setShowFromDPicker(true);
    // alert('from date');
  }

  function showChangeToDate(){
    setShowToDPicker(true);
  }

  function showChangeFromTime(){
    setShowFromTPicker(true);
    // alert('from date');
  }

  function showChangeToTime(){
    setShowToTPicker(true);
  }

  const changeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromtime;
    setShowFromDPicker(false);
    setFromtime(currentDate);
  };

  const changeFromTime = (event, selectedDate) => {
    const currentDate = selectedDate || fromtime;
    setShowFromTPicker(false);
    setFromtime(currentDate);
  };

  const changeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromtime;
    setShowToDPicker(false);
    setTotime(currentDate);
  };

  const changeToTime = (event, selectedDate) => {
    const currentDate = selectedDate || fromtime;
    setShowToTPicker(false);
    setTotime(currentDate);
  };

  React.useEffect(() => {
    loadBuildList();

  }, []);

  return (
    <ScreenWrapper>
      <Text>Work in progress</Text>
      <ScrollView  w="100%">
        <Box 
          m={3}
          p={2}
          bg={form_bg_color}
          w="95%"
          rounded="10px"
        >
          <Text>Search for available workspace</Text>
          <Select
            selectedValue={bID}
            accessibilityLabel="Choose Building"
            placeholder="Choose Building"
            placeholderTextColor={placeholder_color}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => selectBuilding(itemValue)}
          >
            { buildList.map(rec => {
              return (<Select.Item label={rec.building_name} value={rec.id + ""} key={rec.id} />);
            })}
          </Select>
          <Select
            selectedValue={fID}
            accessibilityLabel="Choose Floor (optional)"
            placeholder="Choose Floor (optional)"
            placeholderTextColor={placeholder_color}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => selectFloor(itemValue)}
          >
            { floorList.map(rec => {
              return (<Select.Item label={rec.floor_name} value={rec.id + ""} key={rec.id} />);
            })}
          </Select>
          <Select
            selectedValue={fcID}
            accessibilityLabel="Choose Section (optional)"
            placeholder="Choose Section (optional)"
            placeholderTextColor={placeholder_color}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => selectSection(itemValue)}
          >
            { fcList.map(rec => {
              return (<Select.Item label={rec.label} value={rec.id + ""} key={rec.id} />);
            })}
          </Select>
          <HStack my={3} alignItems="flex-start">
            <Text fontSize="sm" style={{fontFamily}}>From : </Text>
            <Spacer />
            <Text fontSize="sm" color={placeholder_color} onPress={() => showChangeFromDate()}>{fromtime.toDateString()}</Text>
            <Spacer />
            <Text fontSize="sm" color={placeholder_color}  onPress={() => showChangeFromTime()}>{fromtime.toLocaleTimeString()}</Text>

          </HStack>

          <HStack mb={3} alignItems="flex-start">
            <Text fontSize="sm" style={{fontFamily}}>To   : </Text>
            <Spacer />
            <Text fontSize="sm" color={placeholder_color}  onPress={() => showChangeToDate()}>{totime.toDateString()}</Text>
            <Spacer />
            <Text fontSize="sm" color={placeholder_color}  onPress={() => showChangeToTime()}>{totime.toLocaleTimeString()}</Text>

          </HStack>

          <Button key="sm" size="sm">Search</Button>

          {showFromDPicker && (
            <DateTimePicker
              testID="showFromDPicker"
              value={fromtime}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={changeFromDate}
            />
          )}
          {showFromTPicker && (
            <DateTimePicker
              testID="showFromTPicker"
              value={fromtime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={changeFromTime}
            />
          )}
          {showToDPicker && (
            <DateTimePicker
              testID="showToDPicker"
              value={totime}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={changeToDate}
            />
          )}
          {showToTPicker && (
            <DateTimePicker
              testID="showToTPicker"
              value={totime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={changeToTime}
            />
          )}

        </Box>
      </ScrollView>
      <DarkModeToggle />
    </ScreenWrapper>
  );

}