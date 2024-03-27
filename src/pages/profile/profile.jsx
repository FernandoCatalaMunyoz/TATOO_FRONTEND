import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import "./Profile.css";

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("passport"));

  const navigate = useNavigate();

  const [tokenStorage, setTokenStorage] = useState(userData?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [write, setWrite] = useState("disabled");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (!tokenStorage) {
      navigate("/");
    }
  }, [tokenStorage]);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetched = await GetProfile(tokenStorage);
        setLoadedData(true);
        console.log(fetched);
        setUser({
          firstName: fetched.data.firstName,
          lastName: fetched.data.lastName,
          email: fetched.data.email,
        });
        console.log(fetched.data.firstName, "console");
        console.log(fetched.data.lastName);
      } catch (error) {
        console.log(error);
      }
    };
    if (!loadedData) {
      getUserProfile();
    }
  }, [user]);

  const updateData = async () => {
    try {
      const fetched = await UpdateProfile(tokenStorage, user);

      setUser({
        firstName: fetched.data.firstName,
        lastName: fetched.data.lastName,
        email: fetched.data.email,
      });

      setWrite("disabled");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="profileDesign">
        {!loadedData ? (
          <div>CARGANDO...</div>
        ) : (
          <div>
            <div>Nombre</div>
            <CInput
              className={`inputDesign`}
              type={"text"}
              placeHolder={""}
              name={"firstName"}
              disabled={write}
              value={user.firstName || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div>Apellido</div>
            <CInput
              className={`inputDesign`}
              type={"text"}
              placeHolder={""}
              name={"lastName"}
              disabled={write}
              value={user.lastName || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div>email</div>
            <CInput
              className={`inputDesign`}
              type={"email"}
              placeHolder={""}
              name={"email"}
              disabled={"write"}
              value={user.email || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CButton
              className={
                write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"
              }
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />
          </div>
        )}
      </div>
    </>
  );
};
