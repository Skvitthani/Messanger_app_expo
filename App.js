import { UserContext } from "./userContext";
import SatckNavigator from "./src/navigation/SatckNavigator";
import PushNotification from "./PushNotification";

export default function App() {
  return (
    <>
      <PushNotification />
      {/* <UserContext>
        <SatckNavigator />
      </UserContext> */}
    </>
  );
}
