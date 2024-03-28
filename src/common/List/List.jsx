import "./List.css";

export const List = ({ firstName, lastName, email, createdAt, deleteUser }) => {
  return (
    <div className="listDesign">
      <div className="userData">{firstName}</div>
      <div className="userData"> {lastName}</div>
      <div className="userData">{email}</div>
      <div className="userData">{createdAt}</div>
      <div className="divButton">
        <button className="deleteButton">Borrar</button>
      </div>
    </div>
  );
};
