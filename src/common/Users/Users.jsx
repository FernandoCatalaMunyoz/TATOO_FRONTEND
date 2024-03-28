import "./Users.css";

export const User = ({
  id,
  firstName,
  lastName,
  email,
  created,
  clickFunction,
}) => {
  return (
    <div className="usersDesign">
      <div className="userDesign">{firstName}</div>
      <div className="userDesign">{lastName}</div>
      <div className="userDesign">{email}</div>
      <div className="userDesign">{created}</div>
      <div className="userDesign">Borrar{clickFunction}</div>
    </div>
  );
};
