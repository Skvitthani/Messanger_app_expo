import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonConst = ({ title, buttonStyle, titleStyle, onPress }) => {
  return (
    <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
      <Text style={[titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonConst;
