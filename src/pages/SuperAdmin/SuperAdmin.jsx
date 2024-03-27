import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { Card } from "../../common/Card/Card";

export const SuperAdmin = () => {
  const user = JSON.parse(localStorage.getItem("passport"));
  console.log(user, "user");
  console.log(user.decodificado.roleName, "decodificado");
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
        setUsers(fetched);
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
