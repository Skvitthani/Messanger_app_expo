import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ButtonConst from "./ButtonConst";

const Users = ({ item }) => {
  return (
    <TouchableOpacity style={styles.containerView}>
      <Image source={{ uri: item?.image }} style={styles.imageStyle} />
      <View style={styles.textView}>
        <Text style={styles.nameFont}>{item?.name}</Text>
        <Text style={styles.emailFont}>{item?.email}</Text>
      </View>
      <ButtonConst
        title={"Add Friend"}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttontitlestyle}
      />
    </TouchableOpacity>
  );
};

export default Users;

const styles = StyleSheet.create({
  containerView: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  },
  textView: {
    flex: 1,
    marginLeft: 12,
  },
  buttonStyle: {
    width: 105,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#567189",
  },
  buttontitlestyle: {
    fontSize: 13,
    color: "#FFFFFF",
    textAlign: "center",
  },
  nameFont: {
    fontWeight: "bold",
  },
  emailFont: {
    marginTop: 4,
    color: "gray",
  },
});
