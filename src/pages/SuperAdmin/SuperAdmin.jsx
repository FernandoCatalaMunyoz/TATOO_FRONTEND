import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../services/apiCalls";
import { Header } from "../../common/Header/Header";
import { Card } from "../../common/Card/Card";
import "./SuperAdmin.css";
import { List } from "../../common/List/List";

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
      <div className="usersContainer">
        <div className="dataHeader">
          <div className="title">Nombre</div>
          <div className="title">Apellido</div>
          <div className="title">email</div>
          <div className="title">Creado</div>
        </div>
        <div className="sAdminDesign">
          {users.slice(0, 10).map((person) => {
            return (
              <List
                key={person.id}
                firstName={person.firstName}
                lastName={person.lastName}
                email={person.email}
                createdAt={person.createdAt}
              ></List>
            );
          })}
        </div>
      </div>
    </>
  );
};
