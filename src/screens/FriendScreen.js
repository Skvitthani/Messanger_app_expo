import { UserType } from "../../userContext";
import { StyleSheet, Text, View } from "react-native";
import FriendRequest from "../components/FriendRequest";
import React, { useContext, useEffect, useState } from "react";
import { acceptFriendAPI, getfriendRequest } from "../services/APIAction";

const FriendScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const { userId } = useContext(UserType);

  useEffect(() => {
    (async () => {
      const getFriend = await getfriendRequest(userId);
      setFriends(getFriend);
    })();
  }, []);

  const onAcceptFriendrequest = async (item) => {
    try {
      const request = {
        senderId: item,
        receiverId: userId,
      };

      const response = await acceptFriendAPI(request);
      if (response?.message == "Friend request accepted sucessfully.") {
        const remove = friends?.filter((ite) => ite?._id !== item);
        setFriends(remove);
        navigation.navigate("Chats");
      }
    } catch (error) {
      console.log("error on onAcceptFriendrequest", error);
    }
  };
  return (
    <View style={styles?.container}>
      {friends?.length > 0 ? <Text>Your Friend Request</Text> : null}
      {friends?.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          onAcceptFriendrequest={onAcceptFriendrequest}
        />
      ))}
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 12,
  },
});
