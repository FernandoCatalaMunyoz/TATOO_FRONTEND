import { useEffect, useEffect, useState } from "react";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import "./Login.css";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

export const Login = () => {
  const dataUser = JSON.parse(localStorage.getItem("passport"));
  const navigate = useNavigate();
  const [tokenStorage, setTokenStorage] = useState(dataUser?.token);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [credentialsError, setCredentialsError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);

  const loginMe = async () => {
    try {
      for (let element in credentials) {
        if (credentials[element] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = LoginUser(credentials);
      const decoded = decodeToken(fetched.token);

      const passport = {
        token: fetched.token,
        decoded: decoded,
      };

      localStorage.setItem("passport".JSON.stringify(passport));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMsgError(error.message);
    }
  };
  return (
    <>
      <Header></Header>
      <div className="loginDesign">
        <CInput
          className={`inputDesign ${
            credencialesError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type={"email"}
          placeholder={"email"}
          name={"email"}
          disabled={""}
          value={credentials.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credentialsError.emailError}</div>
        <CInput
          className={`inputDesign ${
            credencialesError.passwordError !== "" ? "inputDesignError" : ""
          }`}
          type={"password"}
          placeholder={"password"}
          name={"password"}
          disabled={""}
          value={credentials.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credentialsError.passwordError}</div>

        <CButton
          className={"cButtonDesign"}
          title={"Login"}
          functionEmit={loginMe}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
