import React from 'react';
import {
  Center, Button, Text, ScrollView, useColorModeValue, Box, Select, CheckIcon, Input, Slider, Icon, FormControl, TextArea, Modal, HStack, Spinner
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseUrl, selectUserToken, setTokerr, setUserObj } from '../../app/userSlice';
import axios from 'axios';
import { 
  c_white,
  DarkModeToggle, FormBtnSubmit, FormWrapper, PageTitle, ScreenWrapper, unifi_c4, unifi_c7, unifi_c8, unifi_c9
} from '../../components/styles';
import { FontAwesome5 } from '@expo/vector-icons';

export function DiaryEdit({ route, navigation }) {
  const dispatch = useDispatch();
  
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` }
  };

  const [tagID, setTagID] = React.useState(null);
  const [tagList, setTagList] = React.useState([]);
  const [tagInvalid, setTagInvalid] = React.useState(false);

  const [typeID, setTypeID] = React.useState(null);
  const [typeList, setTypeList] = React.useState([]);
  const [typeInvalid, setTypeInvalid] = React.useState(false);

  const [subtypeID, setSubtypeID] = React.useState(null);
  const [subtypeList, setSubtypeList] = React.useState([]);

  const [tribeID, setTribeID] = React.useState(null);
  const [tribeList, setTribeList] = React.useState([]);
  
  const [gwdTitle, setGwdTitle] = React.useState("");
  const [titleInvalid, setTitleInvalid] = React.useState(false);

  const [gwdDetail, setGwdDetail] = React.useState("");
  const [detailInvalid, setDetailInvalid] = React.useState(false);
  
  const [hrSpent, setHrSpent] = React.useState(1);
  const [hrSpentCol, setHrSpentCol] = React.useState("green");
  const [hrSpentIco, setHrSpentIco] = React.useState("grin");
  const [hrSpentInvalid, setHrSpentInvalid] = React.useState(false);

  const [loadingReasin, setLoadReason] = React.useState("Loading");

  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form_bg_color = useColorModeValue(c_white, unifi_c8);
  const placeholder_color = useColorModeValue(unifi_c4, unifi_c9);

  const { gwdid, seldate, action } = route.params;


  function selectTag(itemval){
    setTagID(itemval);

    // reset the subtype, just in case
    setSubtypeList([]);
    setSubtypeID(null);

    // populate type
    getTypeList(itemval);
  }

  function selectType(itemval){
    setTypeID(itemval);
    setSubtypeID(null);
    getSubtypeList(itemval);
  }

  function selectSubtype(itemval){
    setSubtypeID(itemval);
  }

  function doBtnSubmit(){
    setHrSpentInvalid(false);
    setTitleInvalid(false);
    setDetailInvalid(false);
    setDetailInvalid(false);

    if(action == 'Edit'){
      submitEdit();
    } else {
      submitAdd();
    }
  }

  function submitEdit(){
    setLoadReason('Sending edited diary');
    setIsLoading(true);
    console.log('Sending edited data');
    const theinput = { 
      gwd_id: gwdid,
      tag_id: tagID,
      type_id: typeID,
      subtype_id: subtypeID,
      title: gwdTitle,
      detail: gwdDetail,
      tribe_id: tribeID,
      hours: hrSpent
    };
    console.log(theinput);

    axios.post(
      baseurl + 't/diary/EditGwd', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(response.data.msg);
        if(response.data.status_code == '201'){
          setHrSpentInvalid(true);
        } else if(response.data.status_code == '202'){
          setTitleInvalid(true);
        } else if(response.data.status_code == '203'){
          setDetailInvalid(true);
        } else if(response.data.status_code == '404' || response.data.status_code == '403'){
          navigation.goBack();
          return;
        }
        setIsLoading(false);

      } else {
        if(response.data.msg == 'Success'){
          alert('Diary entry updated');
          navigation.goBack();
        } 
      }

    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
          return;
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetTribeList');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function submitAdd(){
    setLoadReason('Adding diary entry');
    setIsLoading(true);
    console.log('Adding diary entry');
    const theinput = { 
      indate: seldate,
      tag_id: tagID,
      type_id: typeID,
      subtype_id: subtypeID,
      title: gwdTitle,
      detail: gwdDetail,
      tribe_id: tribeID,
      hours: hrSpent
    };

    axios.post(
      baseurl + 't/diary/AddGwd', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(response.data.msg);
        if(response.data.status_code == '201'){
          setHrSpentInvalid(true);
        } else if(response.data.status_code == '202'){
          setTitleInvalid(true);
        } else if(response.data.status_code == '203'){
          setDetailInvalid(true);
        } else if(response.data.status_code == '404' || response.data.status_code == '403'){
          navigation.goBack();
          return;
        }
        setIsLoading(false);
      } else {
        if(response.data.msg == 'Success'){
          alert('Diary entry added');
          navigation.goBack();
        } 
      }

      
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
          return;
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetTribeList');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function getTagList(){
    setLoadReason('Fetching activity tag');
    setIsLoading(true);

    console.log('Fetching activity tag');
    const theinput = { 
      
    };

    axios.post(
      baseurl + 't/diary/GetActTag', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          setTagList(response.data.data);
        } 
      }

      setIsLoading(false);
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetActTag');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function getTypeList(intag = tagID){
    setLoadReason('Fetching activity type');
    setIsLoading(true);
    console.log('Fetching activity type');
    const theinput = { 
      tag_id: intag
    };

    axios.post(
      baseurl + 't/diary/GetActType', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          setTypeList(response.data.data);
        } 
      }

      setIsLoading(false);
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetActType');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function getSubtypeList(intype = typeID){
    setLoadReason('Fetching activity subtype');
    setIsLoading(true);
    console.log('Fetching activity subtype');
    const theinput = { 
      type_id: intype
    };

    axios.post(
      baseurl + 't/diary/GetActSubType', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          setSubtypeList(response.data.data);
        } 
      }

      setIsLoading(false);
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetActSubType');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function getTribeList(){
    // setTribeList([
    //   {assignment_id:1, change_no:'', project_no:'p001', assignment_name: 'namaewa shinderu'},
    //   {assignment_id:2, change_no:'', project_no:'p002', assignment_name: 'namaewa ssaw '},
    //   {assignment_id:3, change_no:'', project_no:'p003', assignment_name: 'namaewa kakeru'},
    //   {assignment_id:4, change_no:'C233a', project_no:'', assignment_name: 'nomsdw'}
    // ]);
    // return;
    setLoadReason('Fetching tribe assignments');
    setIsLoading(true);
    console.log('Fetching tribe assignments');
    const theinput = { 
      
    };

    axios.post(
      baseurl + 't/diary/GetTribeList', theinput, config
    ).then(async (response) => {
      // check for status code
      if(response.data.status_code != '200'){
        alert(JSON.stringify(response.data));
      } else {
        if(response.data.msg == 'Success'){
          setTribeList(response.data.data);
        } 
      }

      setIsLoading(false);
      
    }).catch(error => {
      // dispatch(setTokerr(error.message));
      if(error.response) {
        if(error.response.data.message == 'Unauthenticated.'){
          dispatch(setTokerr('Session expired 2'));
          dispatch(setUserObj(null));
        } else {
          alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
        }
      } else {
        alert('Unknown error. ref: GetTribeList');
      }

      // navigation.goBack();
      setIsLoading(false);
      
    });
  }

  function setDetail(input){
    setGwdDetail(input);
  }

  function onHrInputSliderChange(val){
    try {
      setHrSpent(val);
    if(val <= 4){
      setHrSpentCol('green');
      setHrSpentIco('grin');
    } else if(val <= 8){
      setHrSpentCol('yellow');
      setHrSpentIco('grin-beam');
    } else {
      setHrSpentCol('red');
      setHrSpentIco('grin-beam-sweat');
    }
    } catch (error) {
      console.log(error);
    }
    
  }

  function selectTribe(itemval){
    setGwdTitle("");
    setTribeID(null);

    tribeList.forEach((obj) => {
      if(obj.assignment_id + "" == itemval){
        setGwdTitle(obj.change_no + obj.project_no + ':' + obj.assignment_name);
        setTribeID(itemval);
      }
    });
  }

  function getIfEdit(){
    if(action == 'Edit'){
      setLoadReason('Fetching entry details');
      setIsLoading(true);
      console.log("Fetching entry details");
      const theinput = { 
        gwd_id: gwdid
      };

      axios.post(
        baseurl + 't/diary/GwdDetail', theinput, config
      ).then(async (response) => {
        // check for status code
        if(response.data.status_code != '200'){
          alert('Error ' + response.data.status_code + ': ' + response.data.msg);
          // alert(JSON.stringify(response.data));
          navigation.goBack();
        } else {
          let dataresp = response.data.data;
          console.log(dataresp);

          // setTimeout(() => {
            setTagID(dataresp.tag_id + "");
            setTypeID(dataresp.type_id + "");
            setSubtypeID(dataresp.subtype_id + "");
            setGwdTitle(dataresp.title);
            setGwdDetail(dataresp.details);
            onHrInputSliderChange(dataresp.hours_spent);
            setTribeID(dataresp.tribe_id + "");
          // }, 500);
          
          

          // then fetch the type and subtype
          setIsLoading(false);
          getTypeList(dataresp.tag_id);
          getSubtypeList(dataresp.type_id);

          
        }
      }).catch(error => {
        // dispatch(setTokerr(error.message));
        if(error.response) {
          if(error.response.data.message == 'Unauthenticated.'){
            dispatch(setTokerr('Session expired 2'));
            dispatch(setUserObj(null));
          } else {
            alert('Error ' + error.response.data.status_code + ': ' + error.response.data.message);
          }
        } else {
          alert('Unknown error. ref: GwdDetail');
        }

        navigation.goBack();
        // setIsLoading(false);
        
      });
    } else {
      console.log('not edit');
    }
  }

  React.useEffect(() => {
    getIfEdit();
    // init tag and tribe list
    getTagList();
    getTribeList();

  }, []);

  return (
    <FormWrapper offset={10}> 
      <Modal isOpen={isLoading} >
        <Modal.Content maxWidth="400px">
          <Modal.Body>
          <Center flex={1} px="3">
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Text>{loadingReasin}</Text>
          </HStack>
          </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>     
      <Text mx={3}>{action} Diary Entry. Date: {seldate}</Text>
      <Box border={1}
          m={3}
          p={2}
          bg={form_bg_color}
          w="95%"
          rounded="10px"
        >
          
          

          <FormControl mb={3} isRequired isInvalid={tagInvalid}>
            <FormControl.Label>Activity Tag</FormControl.Label>
            <Select
              selectedValue={tagID}
              accessibilityLabel="Choose Activity Tag"
              placeholder="Choose Activity Tag"
              placeholderTextColor={placeholder_color}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => selectTag(itemValue)}
            >
              { tagList.map(rec => {
                return (<Select.Item label={rec.descr} value={rec.id + ""} key={rec.id} />);
              })}
            </Select>
            <FormControl.ErrorMessage>Please select an activity tag</FormControl.ErrorMessage>
          </FormControl>

          <FormControl mb={3} isRequired isInvalid={typeInvalid}>
            <FormControl.Label>Activity Type</FormControl.Label>
            <Select
              selectedValue={typeID}
              accessibilityLabel="Choose Activity Type"
              placeholder="Choose Activity Type"
              placeholderTextColor={placeholder_color}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => selectType(itemValue)}
            >
              { typeList.length != 0 ? 
                typeList.map(rec => {
                  return (<Select.Item label={rec.descr} value={rec.id + ""} key={rec.id} />);
                }) 
                : tagID ? (<Select.Item label="No activity type configured. Please select a different activity tag." value="" disabled={true} />)
                : (<Select.Item label="Select an activity tag first" value="" disabled={true} />)
            }
            </Select> 
            <FormControl.ErrorMessage>Please select an activity type</FormControl.ErrorMessage>
          </FormControl>

          {subtypeList.length > 0 && (
            <>
              <Text>Activity Subtype</Text>
              <Select mb={3}
                selectedValue={subtypeID}
                accessibilityLabel="Activity Subtype"
                placeholder="Activity Subtype"
                placeholderTextColor={placeholder_color}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => selectSubtype(itemValue)}
              >
                { subtypeList.map(rec => {
                  return (<Select.Item label={rec.descr} value={rec.id + ""} key={rec.id} />);
                })}
              </Select>
            </>
          )}

          {tribeList.length > 0 && (<>
            <FormControl mb={3} >
              <FormControl.Label>TRIBE Assignment</FormControl.Label>
              <Select
                selectedValue={tribeID}
                accessibilityLabel="TRIBE Assignment (optional)"
                placeholder="TRIBE Assignment (optional)"
                placeholderTextColor={placeholder_color}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => selectTribe(itemValue)}
              >
                <Select.Item label="None" value="" key={0} />
                { tribeList.map(rec => {
                  return (<Select.Item label={rec.change_no + rec.project_no + ':' + rec.assignment_name} value={rec.assignment_id + ""} key={rec.assignment_id} />);
                })}
              </Select> 
              
            </FormControl>
          </>
          )}

          <FormControl mb={3} isRequired isInvalid={titleInvalid}>
            <FormControl.Label>ID / Title</FormControl.Label>
            <Input
              width="100%" // mx={3}
              value={gwdTitle}
              onChangeText={setGwdTitle}
              placeholder="Short identifier for this activity"
            />
            <FormControl.ErrorMessage>ID / Title must not be empty</FormControl.ErrorMessage>
          </FormControl>



          <FormControl mb={3} isRequired isInvalid={detailInvalid}>
            <FormControl.Label>Details</FormControl.Label>
            <TextArea value={gwdDetail} onChangeText={setDetail} placeholder="Tell us more about this activity" />
            <FormControl.ErrorMessage>Details must not be empty</FormControl.ErrorMessage>
          </FormControl>

          <FormControl mb={3} isRequired isInvalid={hrSpentInvalid}>
            <FormControl.Label><Text mt={2}>Time spent: {hrSpent} hours</Text></FormControl.Label>
            <Slider 
              // value={hrSpent} 
              size="lg" 
              defaultValue={hrSpent}
              minValue={0.1}
              maxValue={12}
              step={0.1}
              colorScheme={hrSpentCol}
              onChange={(v) => {
                onHrInputSliderChange(v)
              }}
              onChangeEnd={(v) => {
                v && onHrInputSliderChange(v)
              }}
            >
              <Slider.Track >
                <Slider.FilledTrack  />
              </Slider.Track>
              <Slider.Thumb>
                <Icon as={FontAwesome5} name={hrSpentIco} color="black" size="sm" />
              </Slider.Thumb>
            </Slider>
            <FormControl.ErrorMessage>Total time spent for this day exceeded 24 hours</FormControl.ErrorMessage>
          </FormControl>

          <FormBtnSubmit onPress={doBtnSubmit} isLoading={isSubmitting} isLoadingText="Please wait">{action}</FormBtnSubmit>
          
        </Box>
      
    </FormWrapper>
  );
}