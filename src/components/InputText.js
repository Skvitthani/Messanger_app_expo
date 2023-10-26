import { StyleSheet, TextInput } from "react-native";
import React from "react";

const InputText = ({
  value,
  onChange,
  inputStyle,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <TextInput
      value={value}
      style={[inputStyle]}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({});
