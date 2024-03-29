import { useState } from "react";
import { Header } from "../../common/Header/Header";
import "./UserAppointment.css";
import { useNavigate } from "react-router-dom";
import { CreateAppointment } from "../../services/apiCalls";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";

export const UserAppointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    appointmentDate: "",
    serviceId: "",
  });

  const [msgError, setMsgError] = useState("");

  const createAppointment = async () => {
    try {
      for (let element in appointment) {
        if (appointment[element] === "") {
          throw new Error("Todos los campos tienen que estar rellenos");
        }
      }

      const fetched = await CreateAppointment(appointment);

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
            <CInput className={"inputAppointment"} type={"date"} />
            <CInput className={"inputAppointment"} type={"time"} />
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
        </div>
      </div>
    </>
  );
};
