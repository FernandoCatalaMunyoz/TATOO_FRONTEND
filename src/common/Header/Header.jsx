import { Navigator } from "../Navigator/Navigator";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const passport = JSON.parse(localStorage.getItem("passport"));

  const logOut = () => {
    localStorage.removeItem("passport");
    navigate("/");
  };

  return (
    <div className="headerDesign">
      <Navigator title={"home"} destination={"/"}></Navigator>
      {passport?.token ? (
        <div>
          <Navigator
            title={passport?.decodificado?.name}
            destination={"/"}
          ></Navigator>
          <div onClick={logOut}>
            <Navigator title={"log out"} destination={"/"}></Navigator>
          </div>
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
