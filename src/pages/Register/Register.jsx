import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import "./Register.css";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apiCalls";
import { validame } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header/Header";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");

  //funcion emit que está aqui en el padre... que se la pasamos al custom input
  const inputHandler = (e) => {
    //voy a proceder a bindear....
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
      //el truco del almendruco nos dice que seria... nameError: error, o emailError: error
    }));
  };

  //function emit que también está aqui en el padre...en este caso para registrar...
  const registerMe = async () => {
    try {
      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await RegisterUser(user);

      // console.log(fetched);
      setMsgError(fetched.message);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setMsgError(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="registerDesign">
        <div>Registro de Usuario</div>
        <CInput
          className={`inputDesign ${
            userError.first_nameError !== "" ? "inputDesignError" : ""
          }`}
          type={"text"}
          placeHolder={"Nombre"}
          name={"first_name"}
          value={user.first_name || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.nameError}</div>

        <CInput
          className={`inputDesign ${
            userError.last_nameError !== "" ? "inputDesignError" : ""
          }`}
          type={"text"}
          placeHolder={"Apellido"}
          name={"last_name"}
          value={user.last_name || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.nameError}</div>

        <CInput
          className={`inputDesign ${
            userError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type={"email"}
          placeHolder={"email"}
          name={"email"}
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.emailError}</div>

        <CInput
          className={`inputDesign ${
            userError.passwordError !== "" ? "inputDesignError" : ""
          }`}
          type={"password"}
          placeHolder={"password"}
          name={"password"}
          value={user.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.passwordError}</div>
        <CButton
          className={"cButtonDesign"}
          title={"Register"}
          functionEmit={registerMe}
        />
        <div className="error">{msgError}</div>
      </div>
    </>
  );
};
