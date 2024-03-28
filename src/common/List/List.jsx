import { DeleteUser } from "../../services/apiCalls";
import { User } from "../Users/Users";
import "./List.css";

export const List = ({ firstName, lastName, email, createdAt }) => {
  return (
    <div className="listDesign">
      <User
        firstName={firstName}
        lastName={lastName}
        email={email}
        created={createdAt}
      ></User>
    </div>
  );
};
