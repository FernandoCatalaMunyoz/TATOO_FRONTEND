import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import "./UserAppointment.css";
import { useNavigate } from "react-router-dom";
import { CreateAppointment, GetAppointments } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

import { Appointment } from "../../common/Appointments/Appointments";

export const UserAppointment = () => {
  const tokenData = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage, setTokenStorage] = useState(tokenData?.token);
  const [dataBase, setDataBase] = useState(false);

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const [msgError, setMsgError] = useState("");

  const inputHandler = (e) => {
    setAppointments((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (dataBase === false) {
      const getUserAppointments = async () => {
        try {
          const fetched = await GetAppointments(tokenStorage);
          console.log(fetched, "fetcheado");
          setAppointments(fetched.data);
          setDataBase(true);
        } catch (error) {
          console.log(error);
        }
      };
      getUserAppointments();
    }
  }, [appointments]);

  const createAppointment = async () => {
    try {
      for (let element in appointments) {
        if (appointments[element] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await CreateAppointment(appointments);

      setMsgError(fetched.message);
    } catch (error) {
      setMsgError(error.message);
    }
  };
  return (
    <>
      <Header></Header>
      <div className="appointmentView">
        <div className="createAppointment">
          <div className="appointmentInput">
            <div>Crear nueva cita</div>
            <CInput
              className={"inputAppointment"}
              name={"appointmentDate"}
              placeHolder={"MM/DD/AA HH:MM"}
              type={"text"}
              value={appointments.appointmentDate || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div>Servicios:</div>
            <div>1: Tatuajes personalizados</div>
            <div>2: Tatuajes del catálogo</div>
            <div>3: Restauración y rejuvenecimiento de trabajos</div>
            <div>4: Colocación de piercings y dilatadores</div>
            <div>5: Venta de piercings y otros artículos</div>
            <CInput
              className={"serviceId"}
              name={"serviceId"}
              placeHolder={"numero del servicio"}
              type={"text"}
              value={appointments.serviceId || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />

            <CButton
              className={"cButtonDesign"}
              title={"Pedir cita"}
              functionEmit={createAppointment}
            />
          </div>
        </div>

        <div className="appointmentRender">
          <div>Mis citas</div>
          <div className="userAppointments">
            {appointments.map((appointment) => {
              return (
                <Appointment
                  appointmentDate={appointment.appointmentDate}
                  service={appointment.serviceId}
                ></Appointment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
