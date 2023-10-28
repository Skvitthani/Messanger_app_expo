import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Homescreen from "../screens/Homescreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import { MaterialIcons } from "@expo/vector-icons";
import FriendScreen from "../screens/FriendScreen";
import ReigesterScreen from "../screens/ReigesterScreen";
import { NavigationContainer } from "@react-navigation/native";
import ChatMessagesScreen from "../screens/ChatMessagesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          options={(props) => ({
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
                  onPress={() => {
                    props.navigation.navigate("Chats");
                  }}
                  name="chatbox-ellipses-outline"
                  size={24}
                  color="black"
                />
                <MaterialIcons
                  onPress={() => {
                    props.navigation.navigate("Friend");
                  }}
                  name="people-outline"
                  size={24}
                  color="black"
                />
              </View>
            ),
          })}
        />
        <Stack.Screen name="Friend" component={FriendScreen} />
        <Stack.Screen name="Chats" component={ChatScreen} />
        <Stack.Screen name="Messages" component={ChatMessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SatckNavigator;
