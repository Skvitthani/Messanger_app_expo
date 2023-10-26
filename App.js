import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SatckNavigator from "./src/navigation/SatckNavigator";
import { UserContext } from "./userContext";

export default function App() {
  return (
    <>
      <UserContext>
        <SatckNavigator />
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
