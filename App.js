import { UserContext } from "./userContext";
import SatckNavigator from "./src/navigation/SatckNavigator";

export default function App() {
  return (
    <>
      <UserContext>
        <SatckNavigator />
      </UserContext>
    </>
  );
}
