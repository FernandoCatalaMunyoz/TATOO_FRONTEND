import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
