import { Navigator } from "../Navigator/Navigator";
import "./Header.css";

export const Header = () => {
  const token = false;

  const logOut = () => {
    //Esta funcion deslogueara en un futuri
  };

  return (
    <div className="headerDesign">
      <Navigator title={"home"} destination={"/"}></Navigator>
      {token ? (
        <div>
          <Navigator title={"nickdelusuario"} destination={"/"}></Navigator>
          <Navigator title={"log out"} onClick={() => logOut()}></Navigator>
        </div>
      ) : (
        <div>
          <Navigator title={"register"} destination={"/register"}></Navigator>
        </div>
      )}
    </div>
  );
};
