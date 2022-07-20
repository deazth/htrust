import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectBaseUrl,
  selectUserToken,
  setTokerr,
  setUserObj,
} from "app/userSlice";
import { TimeType } from "./types";

const useWorkspaceReservation = (navigation) => {
  const dispatch = useDispatch();
  const baseurl = useSelector(selectBaseUrl);
  const stoken = useSelector(selectUserToken);

  const [buildList, setBuildList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [time, setTime] = useState<TimeType | undefined>(undefined);

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [buildingId, setBuildingId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [floorId, setFloorId] = useState<string | null>(null);
  const config = {
    headers: { Authorization: `Bearer ${stoken}` },
  };
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
  const loadBuildList = () => {
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
            setTime({ from: futtime, to: futtime });
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
  };

  const loadFloorList = (b_id) => {
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
  };
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

  function searchAvailableSeat(fromDate, isMoreThan1Day, toDate) {
    setIsloading(true);

    const offsetMs = time.from.getTimezoneOffset() * 60 * 1000;
    const dateLocalF = new Date(time.from.getTime() - offsetMs);
    const dateLocalT = new Date(time.to.getTime() - offsetMs);

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
              fromTime: time.from,
              toTime: time.to,
              result: response.data.data[0],
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

  useEffect(loadBuildList, []);

  return {
    buildingId,
    floorId,
    sectionId,
    buildList,
    floorList,
    sectionList,
    isLoading,
    time,
    setTime,
    setSectionId,
    loadBuildList,
    loadFloorList,
    searchAvailableSeat,
    selectBuilding,
    selectFloor,
  };
};

export default useWorkspaceReservation;
