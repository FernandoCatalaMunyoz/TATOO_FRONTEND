import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import "./UserAppointment.css";
import {
  CreateAppointment,
  DeleteAppointmentById,
  GetAppointments,
} from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

import { Appointment } from "../../common/Appointments/Appointments";

export const UserAppointment = () => {
  const tokenData = JSON.parse(localStorage.getItem("passport"));
  const [tokenStorage, setTokenStorage] = useState(tokenData?.token);
  const [dataBase, setDataBase] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [msgError, setMsgError] = useState("");

  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",
    serviceId: "",
    userId: tokenData?.decodificado?.userId,
  });
  const [appointmentDataError, setAppointmentDataError] = useState({
    appointmentDateError: "",
    serviceIdError: "",
  });

  const inputHandler = (e) => {
    setAppointmentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (dataBase === false) {
      const getUserAppointments = async () => {
        try {
          const fetched = await GetAppointments(tokenStorage);

          setAppointments(fetched.data);
          setDataBase(true);
        } catch (error) {
          console.log(error);
        }
      };
      getUserAppointments();
    }
  }, [appointments]);

  //Funcion para crear una cita, llamando a la funcion CreateAppointment
  const createAppointment = async () => {
    try {
      for (let element in appointmentData) {
        if (appointments[element] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await CreateAppointment(tokenStorage, appointmentData);
      console.log(fetched, "create fetcheado");

      setAppointments([...appointmentData, fetched.data]);
    } catch (error) {
      setMsgError(error.message);
    }
  };
  //Funcion para borrar cita
  const deleteAppointment = async (id) => {
    try {
      await DeleteAppointmentById(tokenData, id);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {}
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
              type={"timedate"}
              value={appointmentData.appointmentDate || ""}
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
              value={appointmentData.serviceId || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div className="error">{appointmentDataError.serviceIdError}</div>
            <CButton
              className={"cButtonDesign"}
              title={"Pedir cita"}
              functionEmit={() => createAppointment()}
            />
          </div>
        </div>

        <div className="appointmentRender">
          <div>Mis citas</div>
          <div className="userAppointments">
            {appointments.map((appointment, id) => {
              return (
                <>
                  <Appointment
                    key={id}
                    appointmentDate={appointment.appointmentDate}
                    serviceName={appointment.service.servicesName}
                  ></Appointment>
                  <CButton
                    className={"cButtonDesign"}
                    title={"Borrar cita"}
                    functionEmit={() => deleteAppointment(appointment, id)}
                  ></CButton>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
