import {useState} from "react";
import {
    Platform,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import { useDispatch, useSelector } from "react-redux";
  import axios from "axios";

  import * as SecureStore from "expo-secure-store";
  import Constants from "expo-constants";
  import * as Notifications from "expo-notifications";
  import {
    setUserToken,
    setUserID,
    setUserObj,
    selectTokerr,
    setTokerr,
    selectBaseUrl,
  } from "../../app/userSlice";


const useLoginStore = () => {
  const dispatch = useDispatch();

    const initerr = useSelector(selectTokerr);
  const currurl = useSelector(selectBaseUrl);
  const [isSubmitting, setIsSubmitting] =  useState(false);
    const [pnid, setPnid] =  useState("");
    const [username, setUsername] =  useState("");
  const [password, setPassword] =  useState("");
     
    
    async function GetPushID() {
        if (Constants.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            // alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          // console.log(token);
          setPnid(token);
          // this.setState({ expoPushToken: token });
        } else {
          // alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      }
      async function doLogin() {
        setIsSubmitting(true);
        const loginurl = currurl + "UserLogin";
    
        const inputs = {
          staff_no: username,
          password,
          pnid: Constants.isDevice && pnid != "" ? pnid : undefined,
        };
    
        axios
          .post(loginurl, inputs)
          .then(async (response) => {
            // check for status code
            if (response.data.status_code != "200") {
              dispatch(setTokerr(response.data.msg));
              // setErrmsg(response.data.msg);
              setIsSubmitting(false);
            } else {
              // success login
              console.log("login: success");
              // alert(response.data.data.user.name);
              await SecureStore.setItemAsync(
                "apicoin",
                response.data.data.user.token
              );
              dispatch(setUserToken(response.data.data.user.token));
    
              await SecureStore.setItemAsync(
                "user_id",
                response.data.data.user.id.toString()
              );
              dispatch(setUserID(response.data.data.user.token));
              await SecureStore.setItemAsync(
                "staff_no",
                response.data.data.user.staff_no
              );
              dispatch(setUserObj(response.data.data.user));
              console.log("login: done setting up data");
            }
          })
          .catch((error) => {
            dispatch(setTokerr(error.message));
            setIsSubmitting(false);
          });
      }
    
      return {pnid,initerr,currurl,isSubmitting,setUsername,setPassword,GetPushID,doLogin}
}

export default useLoginStore