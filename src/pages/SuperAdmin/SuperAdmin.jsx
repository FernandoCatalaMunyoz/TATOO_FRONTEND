import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { Card } from "../../common/Card/Card";

export const SuperAdmin = () => {
  const user = JSON.parse(localStorage.getItem("passport"));

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.decodificado.roleName !== "super_admin") {
      navigate("/");
    }
  });

  useEffect(() => {
    if (users.length === 0) {
      const bringData = async () => {
        const fetched = await GetUsers();
        console.log(fetched.data, "fetcheado");
        setUsers(fetched.data);
      };
      bringData();
    }
  }, [users]);
  return (
    <>
      <Header />
      <div>Soy la vista superAdmin</div>
    </>
  );
};
