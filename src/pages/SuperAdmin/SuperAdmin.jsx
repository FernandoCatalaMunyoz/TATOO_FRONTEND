import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteUser, GetUsers } from "../../services/apiCalls";
import "./SuperAdmin.css";
import { User } from "../../common/Users/Users";
import { AdminHeader } from "../../common/AdminHeader/AdminHeader";
import { Header } from "../../common/Header/Header";
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

  const deleteUser = async (userId) => {
    try {
      await DeleteUser(userId);
      console.log(userId, "userId");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Header />
      <div>USUARIOS REGISTRADOS</div>
      <div className="usersContainer">
        <div className="dataHeader">
          <div className="title">ID</div>
          <div className="title">Nombre</div>
          <div className="title">Apellido</div>
          <div className="title">email</div>
          <div className="title">Creado</div>
          <div className="title">Borrar</div>
        </div>
        <div className="sAdminDesign">
          {users.slice(0, 10).map((person, id) => {
            return (
              <User
                key={person.id}
                id={person.id}
                firstName={person.firstName}
                lastName={person.lastName}
                email={person.email}
                createdAt={person.createdAt}
                clickFunction={() => deleteUser(person.id)}
              ></User>
            );
          })}
        </div>
      </div>
    </>
  );
};
