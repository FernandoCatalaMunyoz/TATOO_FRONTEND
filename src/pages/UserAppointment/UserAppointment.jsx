import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header";
import "./UserAppointment.css";
import { useNavigate } from "react-router-dom";
import { CreateAppointment, GetAppointments } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import e from "cors";

export const UserAppointment = () => {
  const user = JSON.parse(localStorage.getItem("passport"));

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState({
    appointmentDate: "",
    serviceId: "",
  });

  const [msgError, setMsgError] = useState("");

  const inputHandler = (e) => {
    setAppointments((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (appointments.lenght === 0) {
    }
    const bringData = async () => {
      const fetched = await GetAppointments();
      console.log(fetched, "fetcheado");
      setAppointments(fetched);
    };
    bringData();
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
              type={"date"}
              value={appointments.appointmentDate || ""}
            />
            <CInput
              className={"inputAppointment"}
              type={"time"}
              value={appointments.appointmentDate || ""}
            />
            <form action="#">
              <label htmlFor="serv" id="serv">
                Servicios
              </label>
              <select name="Servicios">
                <option value="1">Tatuaje personalizado</option>
                <option value="2">Tatuaje de catálogo</option>
                <option value="3">
                  Restauracion y rejuvenecimiento de trabajos
                </option>
                <option value="4">Colocacion piercings y dilatadores</option>
                <option value="5">Venta de piercings y otros artículos</option>
              </select>
            </form>
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
            {appointments.slice(0, 10).map((date) => {
              return <></>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
