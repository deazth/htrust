import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  setTokerr,
  setUserObj,
  selectBaseUrl,
  selectUserToken,
} from "../../app/userSlice";

const useAgileOfficeStore = () => {
  const dispatch = useDispatch();
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };
  // current check in list
  const [list, setList] = useState([]);
  // active reservations
  const [reserves, setReserves] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const handleCheckout = (id: number) => {
    const theinput = { id };

    axios
      .post(baseurl + "t/ao/doCheckout", theinput, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(JSON.stringify(response.data));
        } else {
          if (response.data.msg == "Success") {
            alert("Check-out Successful. ");
            loadData();
          } else {
            alert("Check-in failed. " + response.data.msg);
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

        // navigation.goBack();
        return;
      });
  };
  async function loadData() {
    console.log("ao loading");
    setRefreshing(true);
    const getckurl = baseurl + "t/ao/getCurrentCheckins";
    const getrsvpurl = baseurl + "t/ao/getCurrentReservations";

    axios
      .post(getckurl, null, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(response.data.msg);
        } else {
          setList(response.data.data.checkins);
          console.log("ck loaded");
          setRefreshing(false);
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      });

    axios
      .post(getrsvpurl, null, config)
      .then(async (response) => {
        // check for status code
        if (response.data.status_code != "200") {
          alert(response.data.msg);
        } else {
          setReserves(response.data.data.checkins);
          console.log("rsvp loaded");
          setRefreshing(false);
        }
      })
      .catch((error) => {
        // dispatch(setTokerr(error.message));
        if (error.response) {
          if (error.response.data.message == "Unauthenticated.") {
            dispatch(setTokerr("Session expired 2"));
            dispatch(setUserObj(null));
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      });
  }
  return { list, reserves, refreshing, loadData, handleCheckout };
};

export default useAgileOfficeStore;
