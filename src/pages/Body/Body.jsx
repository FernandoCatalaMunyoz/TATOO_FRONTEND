import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Login } from "../login/login";
import { Services } from "../Studio_services/Studio_services";
import { Profile } from "../Profile/Profile";
import { SuperAdmin } from "../SuperAdmin/SuperAdmin";
import { UserAppointment } from "../UserAppointment/UserAppointment";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<SuperAdmin />} />
      <Route path="/appointments" element={<UserAppointment />} />
    </Routes>
  );
};
