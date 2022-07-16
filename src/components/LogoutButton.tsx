import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { setUserToken, setUserID, setUserObj } from "app/userSlice";
import Button from "components/Button";
export const LogoutButton = () => {
  const dispatch = useDispatch();

  function signOut() {
    SecureStore.deleteItemAsync("apicoin");
    SecureStore.deleteItemAsync("user_id");
    SecureStore.deleteItemAsync("staff_no");
    dispatch(setUserToken(null));
    dispatch(setUserID(null));
    dispatch(setUserObj(null));
  }

  return <Button label="Logout" onPress={signOut} />;
};
