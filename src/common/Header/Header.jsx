import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const passport = JSON.parse(localStorage.getItem("passport"));

  const logOut = () => {
    //Esta funcion deslogueara en un futuri
  };

  return (
    <div className="headerDesign">
      <Navigator title={"home"} destination={"/"}></Navigator>
      {passport?.token ? (
        <div>
          <Navigator title={"nickdelusuario"} destination={"/"}></Navigator>
          <Navigator title={"log out"} onClick={() => logOut()}></Navigator>
        </div>
      ) : (
        <div className="authMenu">
          <Navigator title={"register"} destination={"/register"}></Navigator>
          <Navigator title={"Login"} destination={"/login"}></Navigator>
        </div>
      )}
    </div>
  );
};
