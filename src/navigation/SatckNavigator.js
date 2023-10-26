import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReigesterScreen from "../screens/ReigesterScreen";
import LoginScreen from "../screens/LoginScreen";
import Homescreen from "../screens/Homescreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const SatckNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reigester"
          component={ReigesterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={{
            headerTitle: "",
            headerLeft: () => (
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Swift Chat
              </Text>
            ),
            headerRight: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons
                  onPress={() => {}}
                  name="chatbox-ellipses-outline"
                  size={24}
                  color="black"
                />
                <MaterialIcons
                  onPress={() => {}}
                  name="people-outline"
                  size={24}
                  color="black"
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SatckNavigator;

const styles = StyleSheet.create({});
