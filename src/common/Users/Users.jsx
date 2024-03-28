import "./Users.css";

export const User = ({
  id,
  firstName,
  lastName,
  email,
  createdAt,
  clickFunction,
}) => {
  return (
    <div className="usersDesign">
      <div className="userDesign">{id}</div>
      <div className="userDesign">{firstName}</div>
      <div className="userDesign">{lastName}</div>
      <div className="userDesign">{email}</div>
      <div className="userDesign">{createdAt}</div>
      <div className="userDesign" onClick={clickFunction} id="deleteButton">
        Borrar
      </div>
    </div>
  );
};
