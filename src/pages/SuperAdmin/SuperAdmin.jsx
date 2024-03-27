import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SuperAdmin = (tokenStorage, user) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user.role !== "super_admin") {
      navigate("/");
    }
  });
};
