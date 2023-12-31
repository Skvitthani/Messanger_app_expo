import jwt_decode from "jwt-decode";
import Users from "../components/Users";
import { UserType } from "../../userContext";
import { getUerApi } from "../services/APIAction";
import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Homescreen = () => {
  const { setUserId } = useContext(UserType);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const decoded = jwt_decode(token);
      const userId = decoded.userId;
      setUserId(userId);
      const getUser = await getUerApi(userId);
      setUserData(getUser);
    })();
  }, []);

  return (
    <View>
      <View style={styles.userView}>
        {userData?.map((item, index) => (
          <Users item={item} key={index} />
        ))}
      </View>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  userView: {
    padding: 10,
  },
});
